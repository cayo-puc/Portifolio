import { usePortfolioMode } from "../components/PortfolioMode";

function Start() {
  const { startGame, startSite } = usePortfolioMode();
  const startAtHome = (starter) => {
    window.history.replaceState(null, "", "/");
    starter();
  };
  return <main className="start-screen"><div className="start-menu"><button onClick={() => startAtHome(startGame)}>JOGAR PORTFÓLIO</button><button onClick={() => startAtHome(startSite)}>VER VERSÃO SITE</button></div></main>;
}

export default Start;
