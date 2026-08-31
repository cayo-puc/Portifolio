import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

const githubProfile = "https://github.com/cayo-puc";

const projects = {
  nutrisoft: {
    name: "NutriSoft",
    github: githubProfile,
    subtitle: "Sistema de acompanhamento nutricional",
    description: "O NutriSoft é uma aplicação web desenvolvida para auxiliar profissionais de nutrição no gerenciamento e acompanhamento de seus pacientes, centralizando informações importantes para o atendimento em uma única plataforma.",
    participationTitle: "Minha participação",
    participation: "Atuei principalmente no desenvolvimento do módulo de formulários dinâmicos, na construção de grande parte das interfaces e na implementação do assistente virtual, além da integração dessas funcionalidades com o restante da aplicação.",
    highlightsTitle: "Destaques",
    highlights: ["Gerenciamento e acompanhamento de pacientes", "Formulários dinâmicos", "Interface voltada para profissionais de nutrição", "Assistente virtual", "Persistência de dados"],
    technologiesTitle: "Tecnologias",
    technologies: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Thymeleaf", "HTML", "CSS", "JavaScript"],
  },
  vollmed: {
    name: "Voll.Med API",
    github: "https://github.com/cayo-puc/ApiVollMed",
    subtitle: "API REST para gerenciamento de clínica médica",
    description: "Projeto back-end desenvolvido para aplicar na prática a construção de uma API REST com Spring Boot. A aplicação disponibiliza endpoints para gerenciamento de médicos e pacientes, com operações de cadastro, consulta, atualização e exclusão lógica.",
    highlightsTitle: "O que desenvolvi",
    highlights: ["Estruturação de uma API seguindo o padrão REST", "Cadastro e gerenciamento de médicos", "Cadastro e gerenciamento de pacientes", "Validação dos dados recebidos", "Persistência em banco de dados", "Organização da aplicação em diferentes camadas"],
    technologiesTitle: "Tecnologias",
    technologies: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Flyway", "Maven", "Lombok"],
  },
  pipeline: {
    name: "Pipeline de Dados",
    github: "https://github.com/cayo-puc/Pipeline_python",
    subtitle: "Integração e transformação de dados com Python",
    description: "Projeto desenvolvido para integrar dados provenientes de diferentes fontes e formatos. O pipeline realiza etapas de extração, transformação e integração, padronizando os dados antes da geração do arquivo final.",
    highlightsTitle: "O que desenvolvi",
    highlights: ["Leitura de dados em diferentes formatos", "Tratamento e transformação dos dados", "Padronização das informações", "Integração das diferentes fontes", "Geração de uma saída consolidada", "Organização do processamento em etapas"],
    technologiesTitle: "Tecnologias e conceitos",
    technologies: ["Python", "JSON", "CSV", "ETL", "POO"],
  },
};

function ProjectActions({ projectId, onOpen }) {
  const project = projects[projectId];
  return (
    <div className="project-actions">
      <button type="button" onClick={() => onOpen(projectId)}>Ver mais</button>
      <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
    </div>
  );
}

function Projects() {
  const [open, setOpen] = useState(false);
  const [projectDetail, setProjectDetail] = useState(null);
  const openProjectDetail = (projectId) => setProjectDetail(projectId);

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
          <article className={`document portfolio-document projects-newspaper${projectDetail ? " has-project-detail" : ""}`}>
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
            <h1>OUTROS PROJETOS</h1>

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
            {projectDetail && <ProjectDetailsModal project={projects[projectDetail]} onClose={() => setProjectDetail(null)} />}
          </article>
        </div>
      )}
    />
  );
}

export default Projects;
