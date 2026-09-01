import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experiences from "./pages/Experiences";
import Contact from "./pages/Contact";
import Start from "./pages/Start";
import Instructions from "./pages/Instructions";
import GameEnd from "./pages/GameEnd";
import Resume from "./pages/Resume";
import { PortfolioModeContext } from "./components/PortfolioMode";
import FloatingSettings from "./components/FloatingSettings";
import LandscapeGuard from "./components/LandscapeGuard";

import "./App.css";

const BROKEN_BOXES_STORAGE_KEY = "caio-exe-broken-boxes";

const loadBrokenBoxes = () => {
  try {
    const storedBoxes = window.sessionStorage.getItem(BROKEN_BOXES_STORAGE_KEY);
    return storedBoxes ? JSON.parse(storedBoxes) : [];
  } catch {
    return [];
  }
};

function App() {
  const resumePage = window.location.pathname === "/curriculo";
  const [mode, setMode] = useState(null);
  const [gamePhase, setGamePhase] = useState("idle");
  const [destroyedBoxes, setDestroyedBoxes] = useState(loadBrokenBoxes);
  const [foundDocuments, setFoundDocuments] = useState([]);
  const [language, setLanguage] = useState(() => window.localStorage.getItem("portfolio-language") || "pt");

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const toggleLanguage = () => setLanguage((current) => {
    const next = current === "pt" ? "en" : "pt";
    window.localStorage.setItem("portfolio-language", next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    return next;
  });

  const startGame = () => {
    setDestroyedBoxes([]);
    window.sessionStorage.removeItem(BROKEN_BOXES_STORAGE_KEY);
    setFoundDocuments([]);
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
  const destroyBox = (boxId) => setDestroyedBoxes((current) => {
    if (current.includes(boxId)) return current;
    const nextBoxes = [...current, boxId];
    window.sessionStorage.setItem(BROKEN_BOXES_STORAGE_KEY, JSON.stringify(nextBoxes));
    return nextBoxes;
  });
  const endGame = (result) => setGamePhase(result);
  return (
    <PortfolioModeContext.Provider value={{ mode, setMode, language, toggleLanguage, gamePhase, setGamePhase, destroyedBoxes, destroyBox, foundDocuments, collectDocument, startGame, startSite, endGame }}>
      <LandscapeGuard />
      {resumePage ? (
        <BrowserRouter><Routes><Route path="/curriculo" element={<Resume />} /></Routes></BrowserRouter>
      ) : mode === null ? <><Start /><FloatingSettings /></> : gamePhase === "instructions" ? <><Instructions /><FloatingSettings /></> : ["won", "lost"].includes(gamePhase) ? <><GameEnd result={gamePhase} /><FloatingSettings /></> : (
        <BrowserRouter>
          <FloatingSettings />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/experiencias" element={<Experiences />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/curriculo" element={<Resume />} />
          </Routes>
        </BrowserRouter>
      )}
    </PortfolioModeContext.Provider>
  );
}

export default App;
