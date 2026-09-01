import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";
import JournalHeader from "../components/JournalHeader";

function Experiences() {
  const [open, setOpen] = useState(false);

  return (
    <GameLevel
      levelId="experiences"
      backgroundClass="experiences-bg"
      documentPosition={{ left: 40, bottom: 17, depth: 28 }}
      returnPosition={{ left: 76, bottom: 10, depth: -74 }}
      enemySpawns={[{ x: 28, depth: 48 }, { x: 58, depth: -22 }]}
      onDocumentInteract={() => setOpen(true)}
      document={<InteractiveDocument image="/images/objects/newspaper.png" />}
      overlay={open && (
        <div className="document-overlay">
          <article className="document portfolio-document experiences-newspaper">
            <button className="close-document" onClick={() => setOpen(false)}>X</button>
            <JournalHeader archive="EXPERIÊNCIAS" />
            <p className="document-code">REGISTRO RECUPERADO // EXPERIÊNCIAS</p>
            <h1>EXPERIÊNCIAS</h1>
            <section className="document-entry">
              <h2>Monitor de Programação Modular</h2>
              <strong>PUC Minas • Abril de 2026 — Atual</strong>
              <p>Atuo como monitor da disciplina de Programação Modular, auxiliando estudantes na compreensão e resolução de problemas com Java e Programação Orientada a Objetos.</p>
              <p>Nas monitorias e plantões, busco ajudar os alunos a desenvolverem seu próprio raciocínio. Também participo da elaboração de materiais e exercícios práticos e apoio professores no acompanhamento de atividades e projetos.</p>
              <p>Após a primeira experiência na função, fui selecionado novamente para atuar como monitor em um novo semestre.</p>
              <div className="experience-details">
                <section>
                  <h3>Principais atividades</h3>
                  <ul><li>Monitorias e plantões de dúvidas;</li><li>Auxílio em Java e POO;</li><li>Apoio na resolução de problemas;</li><li>Desenvolvimento de materiais e exercícios;</li><li>Acompanhamento de atividades e projetos;</li><li>Colaboração com professores.</li></ul>
                </section>
                <section>
                  <h3>Competências desenvolvidas</h3>
                  <div className="competency-stamps"><span>JAVA</span><span>POO</span><span>DIDÁTICA</span><span>COMUNICAÇÃO</span><span>RESOLUÇÃO DE PROBLEMAS</span><span>COLABORAÇÃO</span></div>
                </section>
              </div>
            </section>
          </article>
        </div>
      )}
    />
  );
}

export default Experiences;
