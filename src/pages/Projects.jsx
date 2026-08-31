import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

const githubProfile = "https://github.com/cayo-puc";

const projects = {
  nutrisoft: {
    name: "NutriSoft",
    github: githubProfile,
    about: {
      objective: "Apoiar o acompanhamento nutricional e a gestão de pacientes em uma solução desenvolvida como Trabalho Interdisciplinar de Engenharia de Software.",
      features: "Organização das informações usadas no acompanhamento nutricional e na gestão de pacientes.",
      participation: "Participei do desenvolvimento do projeto em equipe durante a graduação na PUC Minas.",
    },
    technologies: [
      { name: "Java", use: "Base da lógica e das funcionalidades da aplicação." },
      { name: "Spring Boot", use: "Estruturação da aplicação e integração de suas camadas." },
      { name: "MySQL", use: "Armazenamento e organização dos dados do sistema." },
      { name: "Thymeleaf", use: "Construção das páginas integradas à aplicação Java." },
    ],
  },
  vollmed: {
    name: "Voll.Med API",
    github: githubProfile,
    about: {
      objective: "Construir uma API REST para apoiar a gestão de médicos de uma clínica.",
      features: "Cadastro, listagem paginada, atualização e exclusão lógica de médicos, com validação dos dados recebidos.",
      participation: "Desenvolvi a API e sua organização em DTOs, regras de validação, persistência e migrações do banco de dados.",
    },
    technologies: [
      { name: "Java", use: "Implementação da API e de suas regras de negócio." },
      { name: "Spring Boot", use: "Criação dos endpoints REST e organização da aplicação." },
      { name: "JPA", use: "Mapeamento e persistência das entidades." },
      { name: "MySQL", use: "Banco de dados relacional da aplicação." },
      { name: "Flyway", use: "Versionamento das alterações do banco de dados." },
      { name: "DTOs e validações", use: "Controle e validação dos dados de entrada e saída da API." },
    ],
  },
  pipeline: {
    name: "Pipeline de Dados",
    github: githubProfile,
    about: {
      objective: "Integrar dados provenientes de arquivos JSON e CSV em um fluxo único de tratamento.",
      features: "Extração, padronização, transformação e geração de um arquivo CSV consolidado.",
      participation: "Desenvolvi o fluxo ETL em Python, da leitura das fontes até a geração do resultado consolidado.",
    },
    technologies: [
      { name: "Python", use: "Implementação das etapas de extração, transformação e geração do resultado." },
      { name: "JSON", use: "Formato de uma das fontes de dados processadas." },
      { name: "CSV", use: "Formato de entrada e do arquivo consolidado gerado ao final." },
      { name: "ETL", use: "Organização do fluxo de extração, transformação e carga dos dados." },
    ],
  },
};

function ProjectActions({ projectId, onOpen }) {
  const project = projects[projectId];
  return (
    <div className="project-actions">
      <button type="button" onClick={() => onOpen(projectId, "about")}>Sobre o Projeto</button>
      <button type="button" onClick={() => onOpen(projectId, "technologies")}>Tecnologias</button>
      <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
    </div>
  );
}

function Projects() {
  const [open, setOpen] = useState(false);
  const [projectDetail, setProjectDetail] = useState(null);
  const openProjectDetail = (projectId, view) => setProjectDetail({ projectId, view });

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
            <button className="close-document" onClick={() => { setProjectDetail(null); setOpen(false); }}>X</button>

            <header className="newspaper-masthead">
              <div>
                <p className="newspaper-brand">BREAKING NEWS</p>
                <p className="newspaper-section">SOFTWARE • PROJETOS • TECNOLOGIA</p>
              </div>
              <div className="newspaper-mark">&gt;_</div>
            </header>
            <div className="newspaper-meta"><span>EDIÇÃO 2026</span><span>ARQUIVO // PROJETOS</span><span>BELO HORIZONTE, MG</span></div>
            <h1>PROJETOS EM DESTAQUE</h1>
            <p className="newspaper-lead">Seleção de projetos desenvolvidos durante minha graduação e meus estudos.</p>

            <section className="featured-project">
              <article className="featured-story">
                <h2>NUTRISOFT</h2>
                <p className="project-kicker">TECNOLOGIA A SERVIÇO DA NUTRIÇÃO</p>
                <img src="/images/pictures/nutrisoft.png" alt="Interface do projeto NutriSoft" />
                <p>Projeto desenvolvido em equipe para apoiar o acompanhamento nutricional e a gestão de pacientes. Construído como Trabalho Interdisciplinar de Engenharia de Software na PUC Minas.</p>
                <ProjectActions projectId="nutrisoft" onOpen={openProjectDetail} />
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
                <div className="story-footer"><span>JAVA • SPRING BOOT • JPA • MYSQL</span></div>
                <ProjectActions projectId="vollmed" onOpen={openProjectDetail} />
              </article>

              <article className="project-story">
                <h2>PIPELINE DE DADOS</h2>
                <p className="project-kicker">INTEGRAÇÃO E TRATAMENTO DE DADOS</p>
                <img src="/images/pictures/pipeline.png" alt="Fluxo do pipeline de integração de dados" />
                <p>Pipeline ETL em Python para extração de dados JSON e CSV, padronização, transformação e geração de um arquivo CSV consolidado.</p>
                <div className="story-footer"><span>PYTHON • JSON • CSV • ETL</span></div>
                <ProjectActions projectId="pipeline" onOpen={openProjectDetail} />
              </article>
            </section>

            <footer className="newspaper-footer"><span>Nº 01</span><span>PROJETOS</span><span>PUC MINAS</span></footer>
            {projectDetail && <ProjectDetailsModal project={projects[projectDetail.projectId]} view={projectDetail.view} onClose={() => setProjectDetail(null)} />}
          </article>
        </div>
      )}
    />
  );
}

export default Projects;
