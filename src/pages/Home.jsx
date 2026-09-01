import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCharacter from "../components/GameCharacter";
import { usePortfolioMode } from "../components/PortfolioMode";
import { sceneDepth } from "../components/mobileLayout";

const HIT_DISTANCE = 195;
const boxes = [
  { id: "about", name: "Sobre Mim", image: "/images/objects/box-about.png", route: "/sobre", position: 19, depth: 65 },
  { id: "projects", name: "Projetos", image: "/images/objects/box-projects.png", route: "/projetos", position: 40, depth: -58 },
  { id: "experiences", name: "Experiências", image: "/images/objects/box-experiences.png", route: "/experiencias", position: 64, depth: 32 },
  { id: "contact", name: "Contato", image: "/images/objects/box-contact.png", route: "/contato", position: 84, depth: -74 },
];

function Home() {
  const navigate = useNavigate();
  const { mode, language, destroyedBoxes, destroyBox } = usePortfolioMode();
  const english = language === "en";
  const translatedBoxes = boxes.map((box) => ({ ...box, name: english ? ({ about: "About me", projects: "Projects", experiences: "Experience", contact: "Contact" })[box.id] : box.name }));
  const siteMode = mode === "site";
  const levelRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({ center: 96, depth: 0, width: 0 });
  const target = translatedBoxes
    .map((box) => ({ ...box, distance: Math.abs(playerPosition.center - (playerPosition.width * box.position) / 100), depthDistance: Math.abs(playerPosition.depth - box.depth) }))
    .sort((a, b) => a.distance - b.distance)[0];
  const nearby = target?.distance <= HIT_DISTANCE && target.depthDistance <= 75 ? target : null;

  const findNearbyBox = (position) => translatedBoxes
    .map((box) => ({ ...box, distance: Math.abs(position.center - (position.width * box.position) / 100), depthDistance: Math.abs(position.depth - box.depth) }))
    .sort((a, b) => a.distance - b.distance)[0];

  const interact = (position) => {
    const box = boxes.find((candidate) => candidate.id === position.blockedObstacleId) ?? findNearbyBox(position);
    if (!box || box.distance > HIT_DISTANCE || box.depthDistance > 90) return;
    if (destroyedBoxes.includes(box.id)) {
      navigate(box.route);
      return;
    }
    destroyBox(box.id);
  };

  return (
    <div className="page home-bg">
      <main className={`home-level ${siteMode ? "site-mode" : ""}`} ref={levelRef} aria-label="Level inicial interativo">
        {translatedBoxes.map((box) => {
          const isBroken = !siteMode && destroyedBoxes.includes(box.id);
          return (
            <div className="level-box" key={box.id} style={{ left: `${box.position}%`, bottom: `calc(9% + ${sceneDepth(box.depth)}px)`, zIndex: 20 - Math.round(box.depth / 20), transform: `translateX(-50%) scale(${1 + -sceneDepth(box.depth) / 1200})` }} onClick={siteMode ? () => navigate(box.route) : undefined} role={siteMode ? "link" : undefined} tabIndex={siteMode ? 0 : undefined}>
              <img className="level-box-sprite" src={isBroken ? "/images/objects/box-broken.png" : box.image} alt={isBroken ? `Passagem para ${box.name}` : box.name} />
              {(siteMode || nearby?.id === box.id) && <span className="box-interaction">{siteMode ? (english ? "CLICK TO OPEN" : "CLIQUE PARA ABRIR") : isBroken ? (english ? "[ E ] ENTER" : "[ E ] ENTRAR") : (english ? "[ E / G ] HIT" : "[ E / G ] BATER")}</span>}
            </div>
          );
        })}
        {siteMode ? <img className="site-character" src="/images/caracter/standing.png" alt="Personagem decorativo" /> : <GameCharacter levelRef={levelRef} onInteract={interact} onPositionChange={setPlayerPosition} onLandOnObstacle={(box) => { if (destroyedBoxes.includes(box.id)) navigate(box.route); }} allowGInteraction attackOnE obstacles={boxes} />}
      </main>
    </div>
  );
}

export default Home;
