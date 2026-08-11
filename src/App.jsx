import "./App.css";

function App() {
  return (
    <main className="game">
      <header className="hud">
        <div className="brand">
          <span className="brand-main">CAIO.EXE</span>
          <span className="brand-sub">SOFTWARE DEVELOPER</span>
        </div>

        <div className="hud-stats">
          <span>★ 120</span>
          <span>♥ ♥ ♥</span>
        </div>

        <button className="menu-button">MENU</button>
      </header>

      <section className="world">
        <div className="stars">
          <span className="star star1">+</span>
          <span className="star star2">+</span>
          <span className="star star3">+</span>
          <span className="star star4">+</span>
          <span className="star star5">+</span>
          <span className="star star6">+</span>
          <span className="star star7">+</span>
        </div>

        <div className="moon">
          <div className="moon-hole hole1"></div>
          <div className="moon-hole hole2"></div>
          <div className="moon-hole hole3"></div>
        </div>

        <div className="cloud cloud-left">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="cloud cloud-right">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <section className="intro">
          <p className="level">LEVEL 01</p>

          <h1>
            BEM-VINDO AO
            <br />
            MEU PORTFÓLIO
          </h1>

          <p>Explore minha trajetória como se fosse um jogo.</p>
        </section>

        <div className="question-box box-about">
          <div className="box-symbol">?</div>
          <span>SOBRE MIM</span>
        </div>

        <div className="question-box box-projects">
          <div className="box-symbol">{"</>"}</div>
          <span>PROJETOS</span>
        </div>

        <div className="question-box box-experience">
          <div className="box-symbol">XP</div>
          <span>EXPERIÊNCIAS</span>
        </div>

        <div className="question-box box-contact">
          <div className="box-symbol">@</div>
          <span>CONTATO</span>
        </div>

        <div className="platform platform-left"></div>
        <div className="platform platform-center"></div>
        <div className="platform platform-right"></div>

        <div className="coin coin1"></div>
        <div className="coin coin2"></div>
        <div className="coin coin3"></div>

        <div className="player">
          <div className="hair"></div>
          <div className="face"></div>

          <div className="body">
            <div className="shirt-detail"></div>
          </div>

          <div className="leg leg-left"></div>
          <div className="leg leg-right"></div>
        </div>

        <div className="city">
          <div className="building b1"></div>
          <div className="building b2"></div>
          <div className="building b3"></div>
          <div className="building b4"></div>
          <div className="building b5"></div>
          <div className="building b6"></div>
          <div className="building b7"></div>
          <div className="building b8"></div>
        </div>

        <div className="ground">
          <div className="grass"></div>
          <div className="dirt"></div>
        </div>
      </section>

      <footer className="controls">
        <div>
          <kbd>←</kbd>
          <kbd>→</kbd>
          <span>MOVER</span>
        </div>

        <div>
          <kbd>↑</kbd>
          <span>PULAR</span>
        </div>

        <div className="controls-tip">
          QUEBRE UMA CAIXA PARA ESCOLHER O PRÓXIMO LEVEL
        </div>
      </footer>
    </main>
  );
}

export default App;