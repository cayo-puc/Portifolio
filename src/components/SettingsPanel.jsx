import { usePortfolioMode } from "./PortfolioMode";

function SettingsPanel({ onClose, mode, setMode }) {
  const { language } = usePortfolioMode();
  const english = language === "en";
  return (
    <div className="settings-overlay" role="dialog" aria-modal="true" aria-label="Configurações">
      <section className="settings-panel">
        <button className="close-settings" onClick={onClose} aria-label="Fechar configurações">×</button>
        <h2>{english ? "CONTROLS" : "COMANDOS"}</h2>
        <p><strong>A / D {english ? "or" : "ou"} ← / →</strong> {english ? "move sideways" : "mover lateralmente"}</p>
        <p><strong>W / ↑ {english ? "and" : "e"} S / ↓</strong> {english ? "move in depth" : "mover em profundidade"}</p>
        <p><strong>{english ? "Space" : "Espaço"}</strong> {english ? "jump" : "pular"}</p>
        <p><strong>G</strong> {english ? "guitar attack" : "atacar com guitarra"}</p>
        <p><strong>E</strong> {english ? "interact with objects" : "interagir com objetos"}</p>
        {mode && <button className="mode-switch" onClick={() => { setMode(null); onClose(); }}>{english ? "BACK TO START" : "VOLTAR À TELA INICIAL"}</button>}
      </section>
    </div>
  );
}

export default SettingsPanel;
