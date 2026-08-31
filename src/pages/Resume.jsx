function Resume() {
  return (
    <main className="resume-page">
      <header className="resume-toolbar">
        <div>
          <span>ARQUIVO // CURRÍCULO</span>
          <h1>CAIO SANTOS BORGES</h1>
        </div>
        <a href="/documents/curriculo-caio-santos.pdf" download>BAIXAR PDF</a>
      </header>
      <section className="resume-viewer" aria-label="Visualização do currículo">
        <img src="/documents/curriculo-pages/pagina-1.png" alt="Currículo de Caio Santos Borges, página 1" />
      </section>
    </main>
  );
}

export default Resume;
