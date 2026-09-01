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
      
    </>
  );
}

export default JournalHeader;
