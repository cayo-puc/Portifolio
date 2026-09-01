import { useCallback, useEffect, useRef, useState } from "react";
import { isMobileLandscape, sceneDepth } from "./mobileLayout";

const PLAYER_WIDTH = 160;
const PLAYER_COLLISION_WIDTH = 118;
const BOX_COLLISION_WIDTH = 180;
const DEPTH_COLLISION_DISTANCE = 62;

const MIN_DEPTH = -115;
const MAX_DEPTH = 120;
const BOX_TOP = 120;
const MOVE_SPEED = 320;
const JUMP_SPEED = 950;
const GRAVITY = 1650;
const UI_UPDATE_INTERVAL = 1000 / 60;

const getMovementMetrics = () => {
  const mobileLandscape = isMobileLandscape();
  if (!mobileLandscape) return {
    playerWidth: PLAYER_WIDTH,
    playerCollisionWidth: PLAYER_COLLISION_WIDTH,
    boxCollisionWidth: BOX_COLLISION_WIDTH,
    boxTop: BOX_TOP,
    minDepth: MIN_DEPTH,
    maxDepth: MAX_DEPTH,
    depthSpeed: 190,
  };

  return {
    playerWidth: 82,
    playerCollisionWidth: 60,
    boxCollisionWidth: 92,
    boxTop: 45,
    minDepth: MIN_DEPTH,
    maxDepth: MAX_DEPTH,
    depthSpeed: 190,
  };
};

const spriteSources = [
  "/images/caracter/standing.png",
  "/images/caracter/running1.png",
  "/images/caracter/running2.png",
  "/images/caracter/jumping1.png",
  "/images/caracter/jumping2.png",
  "/images/caracter/beating1.png",
  "/images/caracter/beating2.png",
  "/images/caracter/hurt.png",
];

function GameCharacter({ levelRef, onInteract, onAttack, onPositionChange, onLandOnObstacle, initialX = 0, allowGInteraction = false, attackOnE = false, obstacles = [], hurtUntil = 0, hurtDirection = 1 }) {
  const keysRef = useRef(new Set());
  const joystickRef = useRef(null);
  const callbackRef = useRef({ onInteract, onAttack, onPositionChange, onLandOnObstacle });
  const obstaclesRef = useRef(obstacles);
  const playerRef = useRef({ x: initialX, y: 0, depth: 0, velocityY: 0, facing: 1, attackingUntil: 0 });
  const lastUiUpdateRef = useRef(0);
  const [player, setPlayer] = useState({ x: initialX, y: 0, depth: 0, facing: 1, moving: false, airborne: false, attacking: false });

  useEffect(() => {
    callbackRef.current = { onInteract, onAttack, onPositionChange, onLandOnObstacle };
  }, [onInteract, onAttack, onPositionChange, onLandOnObstacle]);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    spriteSources.forEach((source) => {
      const image = new Image();
      image.src = source;
    });
  }, []);

  const performAction = useCallback((key) => {
    const data = playerRef.current;
    const metrics = getMovementMetrics(levelRef.current);
    if (key === " " && (data.y === 0 || data.y === metrics.boxTop) && performance.now() >= data.attackingUntil) {
      data.velocityY = JUMP_SPEED;
      return;
    }
    if (key !== "e" && key !== "g") return;
    const isAttack = key === "g" || attackOnE;
    if (isAttack) data.attackingUntil = performance.now() + 420;
    const position = {
      center: data.x + metrics.playerWidth / 2,
      depth: data.depth,
      width: levelRef.current?.clientWidth ?? 0,
      facing: data.facing,
      blockedObstacleId: data.blockedObstacleId,
    };
    if (isAttack) callbackRef.current.onAttack?.(position);
    if (key === "e" || allowGInteraction) callbackRef.current.onInteract?.(position);
  }, [allowGInteraction, attackOnE, levelRef]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", " "].includes(key)) event.preventDefault();
      keysRef.current.add(key);
      if (event.repeat) return;
      performAction(key);
    };
    const handleKeyUp = (event) => keysRef.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [performAction]);

  useEffect(() => {
    let animationFrame;
    let previousTime = performance.now();
    const update = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.035);
      previousTime = time;
      const data = playerRef.current;
      const width = levelRef.current?.clientWidth ?? 0;
      const metrics = getMovementMetrics(levelRef.current);
      const left = keysRef.current.has("a") || keysRef.current.has("arrowleft");
      const right = keysRef.current.has("d") || keysRef.current.has("arrowright");
      const up = keysRef.current.has("w") || keysRef.current.has("arrowup");
      const down = keysRef.current.has("s") || keysRef.current.has("arrowdown");
      const attacking = time < data.attackingUntil;
      const hurt = time < hurtUntil;
      const direction = !attacking && !hurt && left !== right ? (right ? 1 : -1) : 0;
      if (hurt) {
        data.x = Math.max(0, Math.min(Math.max(0, width - metrics.playerWidth), data.x + hurtDirection * 340 * delta));
        data.blockedObstacleId = null;
      }
      if (direction) {
        const nextX = Math.max(0, Math.min(Math.max(0, width - metrics.playerWidth), data.x + direction * MOVE_SPEED * delta));
        const currentCenter = data.x + metrics.playerWidth / 2;
        const nextCenter = nextX + metrics.playerWidth / 2;
        const blockingObstacle = data.y < metrics.boxTop && obstaclesRef.current.find((obstacle) => {
          const obstacleCenter = width * obstacle.position / 100;
          const boxLeft = obstacleCenter - metrics.boxCollisionWidth / 2;
          const boxRight = obstacleCenter + metrics.boxCollisionWidth / 2;
          const playerHalfWidth = metrics.playerCollisionWidth / 2;
          const crossesBoxFromLeft = direction === 1 && currentCenter + playerHalfWidth <= boxLeft && nextCenter + playerHalfWidth > boxLeft;
          const crossesBoxFromRight = direction === -1 && currentCenter - playerHalfWidth >= boxRight && nextCenter - playerHalfWidth < boxRight;
          return (crossesBoxFromLeft || crossesBoxFromRight) && Math.abs(data.depth - (obstacle.depth ?? 0)) < DEPTH_COLLISION_DISTANCE;
        });
        if (blockingObstacle) data.blockedObstacleId = blockingObstacle.id;
        else {
          data.x = nextX;
          data.blockedObstacleId = null;
        }
        data.facing = direction;
      }
      if (!hurt && up !== down) {
        const depthDirection = up ? 1 : -1;
        const nextDepth = Math.max(metrics.minDepth, Math.min(metrics.maxDepth, data.depth + depthDirection * metrics.depthSpeed * delta));
        const blockedInDepth = data.y < metrics.boxTop && obstaclesRef.current.some((obstacle) => {
          const obstacleCenter = width * obstacle.position / 100;
          const horizontallyAligned = Math.abs(data.x + metrics.playerWidth / 2 - obstacleCenter) < (metrics.playerCollisionWidth + metrics.boxCollisionWidth) / 2;
          const obstacleDepth = obstacle.depth ?? 0;
          const frontEdge = obstacleDepth - DEPTH_COLLISION_DISTANCE;
          const backEdge = obstacleDepth + DEPTH_COLLISION_DISTANCE;
          const entersFromFront = depthDirection === 1 && data.depth <= frontEdge && nextDepth > frontEdge;
          const entersFromBack = depthDirection === -1 && data.depth >= backEdge && nextDepth < backEdge;
          return horizontallyAligned && (entersFromFront || entersFromBack);
        });
        if (!blockedInDepth) data.depth = nextDepth;
        if (!blockedInDepth) data.blockedObstacleId = null;
      }
      const previousY = data.y;
      data.velocityY -= GRAVITY * delta;
      data.y = Math.max(0, data.y + data.velocityY * delta);
      const playerCenter = data.x + metrics.playerWidth / 2;
      const landingBox = obstaclesRef.current.find((obstacle) => {
        const boxCenter = width * obstacle.position / 100;
        return Math.abs(playerCenter - boxCenter) < (metrics.playerCollisionWidth + metrics.boxCollisionWidth) / 2
          && Math.abs(data.depth - (obstacle.depth ?? 0)) < DEPTH_COLLISION_DISTANCE;
      });
      if (landingBox && data.velocityY < 0 && previousY >= metrics.boxTop && data.y <= metrics.boxTop) {
        data.y = metrics.boxTop;
        data.velocityY = 0;
        callbackRef.current.onLandOnObstacle?.(landingBox);
      }
      if (data.y === 0 && data.velocityY < 0) data.velocityY = 0;
      const next = { x: data.x, y: data.y, depth: data.depth, facing: data.facing, moving: Boolean(direction || up !== down), airborne: data.y > 0 && data.velocityY !== 0, attacking, hurt };
      if (time - lastUiUpdateRef.current >= UI_UPDATE_INTERVAL) {
        lastUiUpdateRef.current = time;
        setPlayer(next);
        callbackRef.current.onPositionChange?.({ center: data.x + metrics.playerWidth / 2, depth: data.depth, width });
      }
      animationFrame = requestAnimationFrame(update);
    };
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [hurtDirection, hurtUntil, levelRef]);

  const state = player.hurt ? "hurt" : player.attacking ? "attacking" : player.airborne ? "jumping" : player.moving ? "running" : "standing";
  const resetJoystick = () => {
    ["w", "a", "s", "d"].forEach((key) => keysRef.current.delete(key));
    if (joystickRef.current) joystickRef.current.style.transform = "translate(-50%, -50%)";
  };
  const moveJoystick = (event) => {
    event.preventDefault();
    const pad = event.currentTarget;
    const bounds = pad.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(x, y);
    const radius = bounds.width * 0.32;
    const ratio = distance > radius ? radius / distance : 1;
    const limitedX = x * ratio;
    const limitedY = y * ratio;
    if (joystickRef.current) joystickRef.current.style.transform = `translate(calc(-50% + ${limitedX}px), calc(-50% + ${limitedY}px))`;
    ["w", "a", "s", "d"].forEach((key) => keysRef.current.delete(key));
    const deadZone = 9;
    if (limitedX < -deadZone) keysRef.current.add("a");
    if (limitedX > deadZone) keysRef.current.add("d");
    if (limitedY < -deadZone) keysRef.current.add("w");
    if (limitedY > deadZone) keysRef.current.add("s");
  };

  return <>
    <div
      className={`player-character player-character--${state}`}
      aria-label="Personagem controlável"
      role="img"
      style={{ left: player.x, bottom: `calc(10% + ${player.y + sceneDepth(player.depth)}px)`, zIndex: 20 - Math.round(player.depth / 20), transform: `scaleX(${player.facing}) scale(${1 + -sceneDepth(player.depth) / 1200})` }}
    >
      {state === "standing" && <img className="character-standing" src={spriteSources[0]} alt="" />}
      {state === "running" && <><img className="character-running character-frame-one" src={spriteSources[1]} alt="" /><img className="character-running character-frame-two" src={spriteSources[2]} alt="" /></>}
      {state === "jumping" && <><img className="character-jumping character-frame-one" src={spriteSources[3]} alt="" /><img className="character-jumping character-frame-two" src={spriteSources[4]} alt="" /></>}
      {state === "attacking" && <><img className="character-attacking character-frame-one" src={spriteSources[5]} alt="" /><img className="character-attacking character-frame-two" src={spriteSources[6]} alt="" /></>}
      {state === "hurt" && <img className="character-hurt" src={spriteSources[7]} alt="" />}
    </div>
    <div className="mobile-game-controls" aria-label="Controles do jogo">
      <div className="mobile-joystick" role="application" aria-label="Joystick de movimentação" onPointerDown={(event) => { event.currentTarget.setPointerCapture?.(event.pointerId); moveJoystick(event); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture?.(event.pointerId)) moveJoystick(event); }} onPointerUp={resetJoystick} onPointerCancel={resetJoystick}>
        <span className="mobile-joystick-knob" ref={joystickRef} />
      </div>
      <div className="mobile-actions">
        <button className="mobile-control mobile-action mobile-action--jump" onPointerDown={(event) => { event.preventDefault(); performAction(" "); }}>PULAR</button>
        <button className="mobile-control mobile-action" onPointerDown={(event) => { event.preventDefault(); performAction("e"); }}>USAR</button>
        <button className="mobile-control mobile-action mobile-action--attack" onPointerDown={(event) => { event.preventDefault(); performAction("g"); }}>GUITARRA</button>
      </div>
    </div>
  </>;
}

export default GameCharacter;
