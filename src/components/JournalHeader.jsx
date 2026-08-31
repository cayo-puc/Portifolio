function JournalHeader({ section, archive }) {
  return (
    <>
      <header className="newspaper-masthead newspaper-masthead--compact">
        <div>
          <p className="newspaper-brand">BREAKING NEWS</p>
          <p className="newspaper-section">{section}</p>
        </div>
        <div className="newspaper-mark">&gt;_</div>
      </header>
      <div className="newspaper-meta newspaper-meta--compact"><span>EDIÇÃO 2026</span><span>ARQUIVO // {archive}</span><span>BELO HORIZONTE, MG</span></div>
    </>
  );
}

export default JournalHeader;
