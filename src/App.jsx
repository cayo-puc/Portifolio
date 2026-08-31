import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experiences from "./pages/Experiences";
import Contact from "./pages/Contact";
import Start from "./pages/Start";
import Instructions from "./pages/Instructions";
import GameEnd from "./pages/GameEnd";
import { PortfolioModeContext } from "./components/PortfolioMode";
import FloatingSettings from "./components/FloatingSettings";

import "./App.css";

function App() {
  const [mode, setMode] = useState(null);
  const [gamePhase, setGamePhase] = useState("idle");
  const [destroyedBoxes, setDestroyedBoxes] = useState([]);
  const [foundDocuments, setFoundDocuments] = useState([]);
  const [enemyProgress, setEnemyProgress] = useState({});

  const startGame = () => {
    setDestroyedBoxes([]);
    setFoundDocuments([]);
    setEnemyProgress({});
    setGamePhase("instructions");
    setMode("game");
  };
  const startSite = () => {
    setGamePhase("playing");
    setMode("site");
  };
  const collectDocument = (documentId) => {
    if (foundDocuments.includes(documentId)) return;
    const nextDocuments = [...foundDocuments, documentId];
    setFoundDocuments(nextDocuments);
    if (nextDocuments.length === 4) setGamePhase("won");
  };
  const saveEnemyProgress = (levelId, enemies) => setEnemyProgress((current) => ({ ...current, [levelId]: enemies }));
  const endGame = (result) => setGamePhase(result);
  return (
    <PortfolioModeContext.Provider value={{ mode, setMode, gamePhase, setGamePhase, destroyedBoxes, setDestroyedBoxes, foundDocuments, collectDocument, enemyProgress, saveEnemyProgress, startGame, startSite, endGame }}>
      {mode === null ? <><Start /><FloatingSettings /></> : gamePhase === "instructions" ? <><Instructions /><FloatingSettings /></> : ["won", "lost"].includes(gamePhase) ? <><GameEnd result={gamePhase} /><FloatingSettings /></> : (
        <BrowserRouter>
          <FloatingSettings />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/experiencias" element={<Experiences />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      )}
    </PortfolioModeContext.Provider>
  );
}

export default App;
