import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";

const githubProfile = "https://github.com/cayo-puc";

function Projects() {
  const [open, setOpen] = useState(false);

  return (
    <GameLevel
      levelId="projects"
      backgroundClass="projects-bg"
      documentPosition={{ left: 58, bottom: 11, depth: -55 }}
      returnPosition={{ left: 17, bottom: 18, depth: 72 }}
      enemySpawns={[{ x: 31, depth: 42 }, { x: 57, depth: -28 }, { x: 79, depth: -62 }]}
      onDocumentInteract={() => setOpen(true)}
      document={<InteractiveDocument image="/images/objects/newspaper.png" />}
      overlay={open && (
        <div className="document-overlay">
          <article className="document portfolio-document projects-newspaper">
            <button className="close-document" onClick={() => setOpen(false)}>X</button>

            <header className="newspaper-masthead">
              <div>
                <p className="newspaper-brand">BREAKING NEWS</p>
                <p className="newspaper-section">SOFTWARE • PROJETOS • TECNOLOGIA</p>
              </div>
              <div className="newspaper-mark">&gt;_</div>
            </header>
            <div className="newspaper-meta"><span>EDIÇÃO 2026</span><span>ARQUIVO // PROJETOS</span><span>BELO HORIZONTE, MG</span></div>
            <h1>PROJETOS EM DESTAQUE</h1>
            <p className="newspaper-lead">Uma seleção de projetos desenvolvidos durante minha graduação e meus estudos.</p>

            <section className="featured-project">
              <article className="featured-story">
                <h2>NUTRISOFT</h2>
                <p className="project-kicker">TECNOLOGIA A SERVIÇO DA NUTRIÇÃO</p>
                <img src="/images/pictures/nutrisoft.png" alt="Interface do projeto NutriSoft" />
                <p>Projeto desenvolvido em equipe para apoiar o acompanhamento nutricional e a gestão de pacientes. Construído como Trabalho Interdisciplinar de Engenharia de Software na PUC Minas.</p>
                <a className="newspaper-action" href={githubProfile} target="_blank" rel="noreferrer">VER PROJETO →</a>
              </article>

              <aside className="project-sidebar">
                <section>
                  <h3>DESTAQUE ACADÊMICO</h3>
                  <p>Melhor Trabalho Interdisciplinar da turma no primeiro semestre de 2026.</p>
                  <p>Selecionado para apresentação no We Make Software.</p>
                  <small>PUC MINAS • 2026</small>
                </section>
                <section>
                  <h3>TECNOLOGIAS</h3>
                  <div className="technology-tags"><span>JAVA</span><span>SPRING BOOT</span><span>MYSQL</span><span>THYMELEAF</span></div>
                </section>
              </aside>
            </section>

            <section className="project-stories">
              <article className="project-story">
                <h2>VOLL.MED API</h2>
                <p className="project-kicker">API REST PARA GESTÃO DE CLÍNICA</p>
                <img src="/images/pictures/vollMed.png" alt="Endpoints da Voll.med API" />
                <p>API em Java e Spring Boot para cadastro, listagem paginada, atualização e exclusão lógica de médicos, com DTOs, validações, JPA, MySQL e Flyway.</p>
                <div className="story-footer"><span>JAVA • SPRING BOOT • JPA • MYSQL</span><a href={githubProfile} target="_blank" rel="noreferrer">VER NO GITHUB →</a></div>
              </article>

              <article className="project-story">
                <h2>PIPELINE DE DADOS</h2>
                <p className="project-kicker">INTEGRAÇÃO E TRATAMENTO DE DADOS</p>
                <img src="/images/pictures/pipeline.png" alt="Fluxo do pipeline de integração de dados" />
                <p>Pipeline ETL em Python para extração de dados JSON e CSV, padronização, transformação e geração de um arquivo CSV consolidado.</p>
                <div className="story-footer"><span>PYTHON • JSON • CSV • ETL</span><a href={githubProfile} target="_blank" rel="noreferrer">VER NO GITHUB →</a></div>
              </article>
            </section>

            <footer className="newspaper-footer"><span>Nº 01</span><span>PROJETOS</span><span>PUC MINAS</span></footer>
          </article>
        </div>
      )}
    />
  );
}

export default Projects;
