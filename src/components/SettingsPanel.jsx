function SettingsPanel({ onClose, mode, setMode }) {
  return (
    <div className="settings-overlay" role="dialog" aria-modal="true" aria-label="Configurações">
      <section className="settings-panel">
        <button className="close-settings" onClick={onClose} aria-label="Fechar configurações">×</button>
        <h2>COMANDOS</h2>
        <p><strong>A / D ou ← / →</strong> mover lateralmente</p>
        <p><strong>W / ↑ e S / ↓</strong> mover em profundidade</p>
        <p><strong>Espaço</strong> pular</p>
        <p><strong>G</strong> atacar com guitarra</p>
        <p><strong>E</strong> interagir com objetos</p>
        {mode && <button className="mode-switch" onClick={() => { setMode(null); onClose(); }}>VOLTAR À TELA INICIAL</button>}
      </section>
    </div>
  );
}

export default SettingsPanel;
