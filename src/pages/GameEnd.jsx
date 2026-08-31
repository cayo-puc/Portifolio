import { usePortfolioMode } from "../components/PortfolioMode";

function GameEnd({ result }) {
  const { startGame, setGamePhase, setMode } = usePortfolioMode();
  const won = result === "won";
  const playAgain = () => {
    startGame();
    setGamePhase("playing");
  };

  return (
    <main className={`game-message-screen end-screen ${won ? "end-screen--win" : "end-screen--lose"}`}>
      <section className="game-message-card">
        <h1>{won ? "YOU WIN" : "YOU LOSE"}</h1>
        <p>{won ? "TODOS OS DOCUMENTOS FORAM RECUPERADOS. PORTFÓLIO EXPLORADO COM SUCESSO." : "SUAS VIDAS FORAM ESGOTADAS. VOLTE À BASE E TENTE NOVAMENTE."}</p>
        <button onClick={playAgain}>{won ? "JOGAR NOVAMENTE" : "TENTAR NOVAMENTE"}</button>
        <button className="secondary-game-action" onClick={() => { setMode(null); setGamePhase("idle"); }}>TELA INICIAL</button>
      </section>
    </main>
  );
}

export default GameEnd;
