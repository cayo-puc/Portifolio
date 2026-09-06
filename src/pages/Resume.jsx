function Resume() {
  const resumePdf = `${import.meta.env.BASE_URL}documents/curriculo-caio-santos.pdf`;
  const resumePreview = `${import.meta.env.BASE_URL}documents/curriculo-pages/pagina-1.png`;

  return (
    <main className="resume-page">
      <header className="resume-toolbar">
        <div>
          <span>ARQUIVO // CURRÍCULO</span>
          <h1>CAIO SANTOS BORGES</h1>
        </div>
        <a href={resumePdf} download>BAIXAR PDF</a>
      </header>
      <section className="resume-viewer" aria-label="Visualização do currículo">
        <img src={resumePreview} alt="Currículo de Caio Santos Borges, página 1" />
      </section>
    </main>
  );
}

export default Resume;
