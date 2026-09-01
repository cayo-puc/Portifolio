import { useEffect } from "react";

function LandscapeGuard() {
  useEffect(() => {
    const requestLandscape = async () => {
      try {
        await window.screen?.orientation?.lock?.("landscape");
      } catch {
        // Alguns navegadores só permitem o bloqueio em tela cheia. Nesse caso,
        // o aviso em modo retrato continua orientando o usuário.
      }
    };

    requestLandscape();
    window.addEventListener("pointerdown", requestLandscape, { once: true });
    return () => window.removeEventListener("pointerdown", requestLandscape);
  }, []);

  return (
    <aside className="portrait-orientation-guard" role="status" aria-live="polite">
      <span className="orientation-phone" aria-hidden="true">📱</span>
      <strong>GIRE SEU CELULAR</strong>
      <p>Este portfólio foi feito para jogar com a tela deitada.</p>
    </aside>
  );
}

export default LandscapeGuard;
