import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";
import JournalHeader from "../components/JournalHeader";

function About() {
  const [open, setOpen] = useState(false);

  return (
    <GameLevel
      levelId="about"
      backgroundClass="about-bg"
      documentPosition={{ left: 24, bottom: 12, depth: 62 }}
      returnPosition={{ left: 82, bottom: 14, depth: -68 }}
      enemySpawns={[{ x: 45, depth: 12 }, { x: 67, depth: -42 }]}
      onDocumentInteract={() => setOpen(true)}
      document={
        <InteractiveDocument image="/images/objects/newspaper.png" />
      }
      overlay={
        open && (
          <div className="document-overlay">
            <article className="document portfolio-document about-newspaper">
              <button
                className="close-document"
                onClick={() => setOpen(false)}
              >
                X
              </button>

              <JournalHeader section="PERFIL • TRAJETÓRIA • CRIATIVIDADE" archive="SOBRE MIM" />
              <p className="document-code">PERFIL RECUPERADO // CAIO SANTOS BORGES</p>
              <h1>SOBRE MIM</h1>

              <div className="about-sections">
                <section className="about-section document-entry">
                  <p className="section-label">APRESENTAÇÃO PESSOAL</p>
                  <h2>Ideias que ganham forma</h2>
                <p>
                  Olá! Eu sou Caio Santos Borges, Engenheiro de Software e alguém que gosta de transformar ideias em coisas que posso criar, experimentar e compartilhar.
                </p>
                  <p>Na programação, encontrei mais uma forma de expressar meu lado criativo. Gosto da possibilidade de pegar uma ideia e transformá-la em algo que realmente funciona, misturando lógica, tecnologia e criatividade.</p>
                </section>

                <section className="document-entry about-education">
                  <p className="section-label">FORMAÇÃO ACADÊMICA</p>
                  <h2>Engenharia de Software</h2>
                  <strong>PUC Minas • 2025 — 2028 (previsão)</strong>
                  <p>Curso Engenharia de Software na PUC Minas, construindo minha formação por meio de disciplinas e projetos práticos, individuais e em equipe.</p>
                </section>

                <section className="document-entry about-beyond-code">
                  <p className="section-label">ALÉM DO CÓDIGO</p>
                  <h2>Criatividade em outras linguagens</h2>
                  <p>Sempre tive uma forte conexão com a criatividade e a arte. Gosto de desenhar e pintar, e a música é uma das minhas maiores paixões. Adoro tocar instrumentos, explorar ideias diferentes e aprender coisas novas.</p>
                  <p>Também sou apaixonado por animais e gosto muito de estar perto deles.</p>
                </section>
              </div>
            </article>
          </div>
        )
      }
    />
  );
}

export default About;
