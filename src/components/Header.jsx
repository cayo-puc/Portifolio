import { Link } from "react-router-dom";
import { useState } from "react";
import { usePortfolioMode } from "./PortfolioMode";
import SettingsPanel from "./SettingsPanel";

function Header() {
  const { mode, setMode } = usePortfolioMode();
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <header className="header">
      <Link to="/" className="logo">
        CAIO.EXE
      </Link>

      <nav className="nav">
        <Link to="/sobre">Sobre</Link>
        <Link to="/projetos">Projetos</Link>
        <Link to="/experiencias">Experiências</Link>
        <Link to="/contato">Contato</Link>
      </nav>
      <div className="header-actions">
        <button onClick={() => setSettingsOpen(true)}>CONTROLES</button>
        <button onClick={() => setMode(mode === "game" ? "site" : "game")}>{mode === "game" ? "VERSÃO SITE" : "VERSÃO GAME"}</button>
      </div>
      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </header>
  );
}

export default Header;
