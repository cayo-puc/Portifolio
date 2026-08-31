import { usePortfolioMode } from "../components/PortfolioMode";

function Start() {
  const { startGame, startSite, language, toggleLanguage } = usePortfolioMode();
  const english = language === "en";
  const startAtHome = (starter) => {
    window.history.replaceState(null, "", "/");
    starter();
  };
  return (
    <main className="start-screen">
      <div className="start-menu">
        <button onClick={() => startAtHome(startGame)}>{english ? "PLAY PORTFOLIO" : "JOGAR PORTFÓLIO"}</button>
        <button onClick={() => startAtHome(startSite)}>{english ? "VIEW SITE VERSION" : "VER VERSÃO SITE"}</button>
        <button className="start-language-switch" onClick={toggleLanguage} aria-label={english ? "Mudar idioma para português" : "Change language to English"}>
          {english ? "PORTUGUÊS" : "ENGLISH"}
        </button>
      </div>
    </main>
  );
}

export default Start;
