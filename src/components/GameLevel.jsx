import { cloneElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCharacter from "./GameCharacter";
import { usePortfolioMode } from "./PortfolioMode";
import { sceneDepth } from "./mobileLayout";

const INTERACTION_DISTANCE = 195;
const RETURN_INTERACTION_DISTANCE = 280;
const ATTACK_REACH = 180;
const ENEMY_RUN_DISTANCE = 23;
const PROJECTILE_SPEED = 30;
const ATTACK_CHARGE_DURATION = 1050;
const UI_UPDATE_INTERVAL = 1000 / 60;
const initialPlayerPosition = { center: 96, depth: 0, width: 0 };

const createEnemies = (spawns) => spawns.map((enemy, index) => ({ ...enemy, id: `rat-${index}`, hits: 0, lastShot: 0 }));

function GameLevel({ backgroundClass, documentPosition, returnPosition, onDocumentInteract, document, overlay, enemySpawns = [], levelId }) {
  const navigate = useNavigate();
  const { mode, collectDocument, endGame, foundDocuments } = usePortfolioMode();
  const siteMode = mode === "site";
  // Um level concluído não recria inimigos; levels ainda não concluídos começam
  // limpos em cada visita para evitar preservar estados de animação obsoletos.
  const initialEnemies = foundDocuments.includes(levelId) ? [] : createEnemies(enemySpawns);
  const levelRef = useRef(null);
  const playerRef = useRef(initialPlayerPosition);
  const livesRef = useRef(3);
  const damageCooldownRef = useRef(0);
  const enemiesRef = useRef(initialEnemies);
  const projectilesRef = useRef([]);
  const lastUiUpdateRef = useRef(0);
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);
  const [enemies, setEnemies] = useState(initialEnemies);
  const [projectiles, setProjectiles] = useState([]);
  const [lives, setLives] = useState(3);
  const [hurtUntil, setHurtUntil] = useState(0);
  const [hurtDirection, setHurtDirection] = useState(1);

  const enemiesDefeated = enemies.length === 0;
  const documentDistance = Math.abs(playerPosition.center - (playerPosition.width * documentPosition.left) / 100);
  const returnDistance = Math.abs(playerPosition.center - (playerPosition.width * returnPosition.left) / 100);
  const canRead = enemiesDefeated && documentDistance <= INTERACTION_DISTANCE && Math.abs(playerPosition.depth - documentPosition.depth) <= 90;
  const canReturn = returnDistance <= RETURN_INTERACTION_DISTANCE && Math.abs(playerPosition.depth - returnPosition.depth) <= 125;

  useEffect(() => {
    if (siteMode || lives === 0) return undefined;
    let frame;
    let previousTime = performance.now();
    const damagePlayer = (direction, time) => {
      if (time < damageCooldownRef.current) return;
      damageCooldownRef.current = time + 1100;
      setHurtDirection(direction || 1);
      setHurtUntil(time + 520);
      const nextLives = Math.max(0, livesRef.current - 1);
      livesRef.current = nextLives;
      setLives(nextLives);
      if (nextLives === 0) endGame("lost");
    };
    const updateCombat = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.035);
      previousTime = time;
      const player = playerRef.current;
      if (player.width && enemiesRef.current.length) {
        const playerPercent = (player.center / player.width) * 100;
        const newProjectiles = [];
        const nextEnemies = enemiesRef.current.map((enemy) => {
          const horizontalGap = playerPercent - enemy.x;
          const depthGap = player.depth - enemy.depth;
          const closeEnoughToRun = Math.abs(horizontalGap) < ENEMY_RUN_DISTANCE && Math.abs(depthGap) < 80;
          const hurt = time < (enemy.hurtUntil ?? 0);
          let next = { ...enemy, moving: false, attacking: false, charging: false, hurt };

          if (hurt) {
            next.x = Math.max(4, Math.min(94, enemy.x + (enemy.knockbackDirection ?? -1) * 26 * delta));
          } else if (enemy.chargeUntil) {
            next.facing = enemy.attackDirection ?? enemy.facing ?? -1;
            if (time < enemy.chargeUntil) {
              next.attacking = true;
              next.charging = true;
            } else {
              const direction = enemy.attackDirection ?? -1;
              newProjectiles.push({ id: `ball-${time}-${enemy.id}`, x: enemy.x + direction * 5, depth: enemy.depth + 16, direction });
              next.chargeUntil = 0;
              next.lastShot = time;
              next.charging = false;
            }
          } else if (closeEnoughToRun) {
            // O rato evita o jogador: desloca-se no sentido oposto tanto no eixo
            // horizontal quanto no de profundidade, mantendo o rosto voltado para a fuga.
            const xDirection = -Math.sign(horizontalGap) || -(enemy.facing ?? -1);
            const depthDirection = Math.abs(depthGap) > 8 ? -Math.sign(depthGap) : 0;
            next = {
              ...next,
              x: Math.max(4, Math.min(94, enemy.x + xDirection * 17 * delta)),
              depth: Math.max(-80, Math.min(75, enemy.depth + depthDirection * 58 * delta)),
              moving: Boolean(xDirection || depthDirection),
              facing: xDirection || enemy.facing || -1,
            };
          } else if (time - enemy.lastShot > 1800) {
            const direction = Math.sign(horizontalGap) || enemy.facing || -1;
            next.chargeUntil = time + ATTACK_CHARGE_DURATION;
            next.attackDirection = direction;
            next.attacking = true;
            next.charging = true;
            next.facing = direction;
          }
          return next;
        });
        enemiesRef.current = nextEnemies;

        if (newProjectiles.length) {
          projectilesRef.current = [...projectilesRef.current, ...newProjectiles];
        }
      }

      if (player.width && projectilesRef.current.length) {
        const playerPercent = (player.center / player.width) * 100;
        projectilesRef.current = projectilesRef.current.reduce((active, projectile) => {
          const next = { ...projectile, x: projectile.x + projectile.direction * PROJECTILE_SPEED * delta };
          const hitsPlayer = Math.abs(next.x - playerPercent) < 2.3 && Math.abs(next.depth - player.depth) < 52;
          if (hitsPlayer) damagePlayer(next.direction, time);
          if (!hitsPlayer && next.x > -4 && next.x < 104) active.push(next);
          return active;
        }, []);
      }
      if (time - lastUiUpdateRef.current >= UI_UPDATE_INTERVAL) {
        lastUiUpdateRef.current = time;
        setEnemies(enemiesRef.current);
        setProjectiles(projectilesRef.current);
      }
      frame = requestAnimationFrame(updateCombat);
    };
    frame = requestAnimationFrame(updateCombat);
    return () => cancelAnimationFrame(frame);
  }, [endGame, lives, siteMode]);

  useEffect(() => {
    ["rat-standing.png", "rat-running-1.png", "rat-running-2.png", "rat-runing-3.png", "rat-attack-1.png", "rat-hurt.png"].forEach((file) => {
      const image = new Image();
      image.src = `/images/enemies/${file}`;
    });
  }, []);

  const updatePlayerPosition = (position) => {
    playerRef.current = position;
    setPlayerPosition(position);
  };

  const interact = (position) => {
    const documentIsNear = enemiesDefeated && Math.abs(position.center - (position.width * documentPosition.left) / 100) <= INTERACTION_DISTANCE && Math.abs(position.depth - documentPosition.depth) <= 90;
    const returnIsNear = Math.abs(position.center - (position.width * returnPosition.left) / 100) <= RETURN_INTERACTION_DISTANCE && Math.abs(position.depth - returnPosition.depth) <= 125;
    if (returnIsNear || position.blockedObstacleId === "return") {
      navigate("/");
    } else if (documentIsNear) {
      collectDocument(levelId);
      onDocumentInteract();
    }
  };

  const attackEnemy = (position) => {
    const now = performance.now();
    const targets = enemiesRef.current
      .map((enemy) => ({ ...enemy, horizontalDistance: ((enemy.x / 100) * position.width - position.center) * position.facing, depthDistance: Math.abs(enemy.depth - position.depth) }))
      .filter((enemy) => enemy.horizontalDistance >= -25 && enemy.horizontalDistance <= ATTACK_REACH && enemy.depthDistance <= 76)
      .sort((a, b) => a.horizontalDistance - b.horizontalDistance);
    if (!targets[0]) return;
    const targetId = targets[0].id;
    const next = enemiesRef.current.flatMap((enemy) => {
      if (enemy.id !== targetId) return [enemy];
      if (enemy.hits >= 1) return [];
      return [{ ...enemy, hits: 1, hurt: true, hurtUntil: now + 640, knockbackDirection: position.facing, facing: -position.facing }];
    });
    enemiesRef.current = next;
    setEnemies(next);
  };

  return (
    <div className={`page ${backgroundClass}`}>
      <main className={`game-content playable-level ${siteMode ? "site-mode" : ""}`} ref={levelRef} aria-label="Level interativo">
        {!siteMode && <div className="combat-hearts" aria-label={`Vidas: ${lives} de 3`}>{"♥".repeat(lives)}{"♡".repeat(3 - lives)}</div>}

        <div className={`scene-document ${enemiesDefeated || siteMode ? "is-unlocked" : "is-locked"}`} style={{ left: `${documentPosition.left}%`, bottom: `calc(${documentPosition.bottom}% + ${sceneDepth(documentPosition.depth)}px)`, zIndex: 20 - Math.round(documentPosition.depth / 20), transform: `translateX(-50%) scale(${1 + -sceneDepth(documentPosition.depth) / 1200})` }}>
          {cloneElement(document, { onInteract: siteMode ? onDocumentInteract : undefined })}
          {(siteMode || canRead) && <span className="scene-prompt">{siteMode ? "CLIQUE PARA LER" : "[ E ] LER DOCUMENTO"}</span>}
          {!siteMode && !enemiesDefeated && <span className="scene-prompt scene-prompt--locked">DOCUMENTO BLOQUEADO</span>}
        </div>

        <div className="return-gate" aria-label="Passagem de volta" style={{ left: `${returnPosition.left}%`, bottom: `calc(9% + ${sceneDepth(returnPosition.depth)}px)`, zIndex: 20 - Math.round(returnPosition.depth / 20), transform: `translateX(-50%) scale(${1 + -sceneDepth(returnPosition.depth) / 1200})` }} onClick={siteMode ? () => navigate("/") : undefined}>
          <img src="/images/objects/box-broken.png" alt="Passagem de volta para a Home" />
          {(siteMode || canReturn) && <span className="scene-prompt">{siteMode ? "CLIQUE PARA HOME" : "[ E ] VOLTAR À HOME"}</span>}
        </div>

        {!siteMode && enemies.map((enemy) => (
          <div className={`enemy-rat${enemy.moving ? " is-moving" : ""}${enemy.attacking ? " is-attacking" : ""}${enemy.hurt ? " is-hurt" : ""}`} key={enemy.id} style={{ left: `${enemy.x}%`, bottom: `calc(10% + ${sceneDepth(enemy.depth)}px)`, zIndex: 20 - Math.round(enemy.depth / 20), transform: `translateX(-50%) scaleX(${-(enemy.facing ?? -1)}) scale(${1 + -sceneDepth(enemy.depth) / 1200})` }}>
            {enemy.hurt ? <img className="enemy-hurt" src="/images/enemies/rat-hurt.png" alt="Rato ferido" /> : enemy.attacking ? <img className="enemy-attacking" src="/images/enemies/rat-attack-1.png" alt="Rato preparando ataque" /> : enemy.moving ? <><img className="enemy-running enemy-frame-two" src="/images/enemies/rat-running-2.png" alt="Rato correndo" /><img className="enemy-running enemy-frame-three" src="/images/enemies/rat-runing-3.png" alt="" /><img className="enemy-running enemy-frame-one" src="/images/enemies/rat-running-1.png" alt="" /></> : <img className="enemy-standing" src="/images/enemies/rat-standing.png" alt="Rato inimigo" />}
          </div>
        ))}

        {!siteMode && projectiles.map((projectile) => (
          <div className="purple-projectile" key={projectile.id} aria-label="Projétil inimigo" style={{ left: `${projectile.x}%`, bottom: `calc(10% + ${sceneDepth(projectile.depth)}px)`, transform: `translateX(-50%) scaleX(${projectile.direction})` }}>
            <img className="projectile-frame-one" src="/images/objects/purpleball-1.png" alt="" />
            <img className="projectile-frame-two" src="/images/objects/purpleball-2.png" alt="" />
          </div>
        ))}

        {siteMode ? <img className="site-character" src="/images/caracter/standing.png" alt="Personagem decorativo" /> : lives > 0 && <GameCharacter levelRef={levelRef} onInteract={interact} onAttack={attackEnemy} onPositionChange={updatePlayerPosition} onLandOnObstacle={(obstacle) => { if (obstacle.id === "return") navigate("/"); }} obstacles={[{ id: "return", position: returnPosition.left, depth: returnPosition.depth }]} hurtUntil={hurtUntil} hurtDirection={hurtDirection} />}
      </main>
      {overlay}
    </div>
  );
}

export default GameLevel;
