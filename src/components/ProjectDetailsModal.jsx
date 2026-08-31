import { useEffect, useRef } from "react";

function ProjectDetailsModal({ project, view, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const title = view === "technologies" ? "Tecnologias" : "Sobre o Projeto";

  return (
    <div className="project-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="project-detail-card" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button ref={closeButtonRef} className="project-modal-close" type="button" onClick={onClose} aria-label="Fechar detalhes do projeto">×</button>
        <p className="project-modal-file">ARQUIVO COMPLEMENTAR // {project.name}</p>
        <h2 id="project-modal-title">{title}</h2>

        {view === "about" ? (
          <div className="project-about-grid">
            <section>
              <h3>Objetivo</h3>
              <p>{project.about.objective}</p>
            </section>
            <section>
              <h3>Principais funcionalidades</h3>
              <p>{project.about.features}</p>
            </section>
            <section>
              <h3>Minha participação</h3>
              <p>{project.about.participation}</p>
            </section>
          </div>
        ) : (
          <ul className="project-technology-list">
            {project.technologies.map((technology) => (
              <li key={technology.name}>
                <strong>{technology.name}</strong>
                <span>{technology.use}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProjectDetailsModal;
