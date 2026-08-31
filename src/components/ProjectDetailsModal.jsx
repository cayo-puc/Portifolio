import { useEffect, useRef } from "react";

function ProjectDetailsModal({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="project-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="project-detail-card" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button ref={closeButtonRef} className="project-modal-close" type="button" onClick={onClose} aria-label="Fechar detalhes do projeto">×</button>
        <p className="project-modal-file">ARQUIVO COMPLEMENTAR // {project.name}</p>
        <h2 id="project-modal-title">{project.name}</h2>
        <p className="project-detail-subtitle">{project.subtitle}</p>
        <p className="project-detail-description">{project.description}</p>

        {project.participation && (
          <section className="project-detail-section">
            <h3>{project.participationTitle}</h3>
            <p>{project.participation}</p>
          </section>
        )}

        <section className="project-detail-section">
          <h3>{project.highlightsTitle}</h3>
          <ul className="project-highlight-list">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </section>

        <section className="project-detail-section">
          <h3>{project.technologiesTitle}</h3>
          <div className="project-technology-tags">
            {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProjectDetailsModal;
