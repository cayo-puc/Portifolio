import { usePortfolioMode } from "../components/PortfolioMode";

function Instructions() {
  const { setGamePhase } = usePortfolioMode();

  return (
    <main className="game-message-screen instructions-screen">
      <section className="game-message-card">
        <h1>COMO JOGAR</h1>
        <p>EXPLORE TODOS OS CENÁRIOS E ENCONTRE OS 4 DOCUMENTOS PERDIDOS DO PORTFÓLIO.</p>
        <p>QUEBRE AS CAIXAS PARA ACESSAR NOVOS LEVELS. DERROTE OS INIMIGOS PARA LIBERAR CADA DOCUMENTO.</p>
        <div className="instructions-keys">
          <p><strong>A / D ou ← / →</strong> ANDAR</p>
          <p><strong>W / S ou ↑ / ↓</strong> PROFUNDIDADE</p>
          <p><strong>ESPAÇO</strong> PULAR</p>
          <p><strong>G</strong> ATACAR</p>
          <p><strong>E</strong> INTERAGIR</p>
        </div>
        <button onClick={() => setGamePhase("playing")}>INICIAR MISSÃO</button>
      </section>
    </main>
  );
}

export default Instructions;
