function InteractiveDocument({
  image,
  label = "[ E ] INTERAGIR",
  onInteract,
  className = "",
}) {
  return (
    <button
      className={`interactive-document ${className}`}
      onClick={onInteract}
    >
      <img
        src={image}
        alt="Documento interativo"
      />

      <span className="interact-message">
        {label}
      </span>
    </button>
  );
}

export default InteractiveDocument;