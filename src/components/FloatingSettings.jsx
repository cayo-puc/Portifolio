import { useState } from "react";
import { usePortfolioMode } from "./PortfolioMode";
import SettingsPanel from "./SettingsPanel";

function FloatingSettings() {
  const { mode, setMode } = usePortfolioMode();
  const [open, setOpen] = useState(false);
  return <><button className="floating-settings" onClick={() => setOpen(true)} aria-label="Abrir configurações">⚙</button>{open && <SettingsPanel onClose={() => setOpen(false)} mode={mode} setMode={setMode} />}</>;
}

export default FloatingSettings;
