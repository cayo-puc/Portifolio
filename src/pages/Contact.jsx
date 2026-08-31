import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";
import JournalHeader from "../components/JournalHeader";

function Contact() {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Contato pelo portfólio — ${formData.get("name")}`);
    const body = encodeURIComponent(`Nome: ${formData.get("name")}\nE-mail: ${formData.get("email")}\n\n${formData.get("message")}`);
    setFormStatus("Seu aplicativo de e-mail foi aberto para concluir o envio.");
    window.location.href = `mailto:caio.santos.software@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <GameLevel
      levelId="contact"
      backgroundClass="contact-bg"
      documentPosition={{ left: 70, bottom: 13, depth: -68 }}
      returnPosition={{ left: 31, bottom: 19, depth: 48 }}
      enemySpawns={[{ x: 47, depth: 16 }, { x: 75, depth: -54 }]}
      onDocumentInteract={() => setOpen(true)}
      document={<InteractiveDocument image="/images/objects/newspaper.png" />}
      overlay={open && (
        <div className="document-overlay">
          <article className="document portfolio-document contact-newspaper">
            <button className="close-document" onClick={() => setOpen(false)}>X</button>
            <JournalHeader section="CONTATO • CONEXÕES • OPORTUNIDADES" archive="CONTATO" />
            <p className="document-code">CANAL DE COMUNICAÇÃO</p>
            <h1>CONTATO</h1>
            <p>Estou aberto a oportunidades de estágio, projetos e novas conexões profissionais. Se quiser conversar sobre desenvolvimento, tecnologia ou algum dos meus projetos, fique à vontade para entrar em contato.</p>
            <section className="document-entry contact-layout">
              <div className="contact-details">
                <h2>Canais diretos</h2>
                <a className="contact-channel" href="mailto:caio.santos.software@gmail.com"><span aria-hidden="true">✉</span><span><strong>E-mail</strong><small>caio.santos.software@gmail.com</small></span></a>
                <a className="contact-channel" href="https://linkedin.com/in/caio-santos-borges-792591362/" target="_blank" rel="noreferrer"><span aria-hidden="true">in</span><span><strong>LinkedIn</strong><small>Caio Santos Borges</small></span></a>
                <a className="contact-channel" href="https://github.com/cayo-puc" target="_blank" rel="noreferrer"><span aria-hidden="true">&lt;/&gt;</span><span><strong>GitHub</strong><small>@cayo-puc</small></span></a>
                <div className="contact-location"><strong>Localização</strong><span>Belo Horizonte — MG, Brasil</span></div>
              </div>

              <form className="contact-form newspaper-contact-form" onSubmit={sendMessage}>
                <h2>Envie uma mensagem</h2>
                <label htmlFor="contact-name">Nome</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required />
                <label htmlFor="contact-email">E-mail</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required />
                <label htmlFor="contact-message">Mensagem</label>
                <textarea id="contact-message" name="message" rows="5" required />
                <button type="submit">ENVIAR MENSAGEM →</button>
                {formStatus && <p className="form-status" role="status">{formStatus}</p>}
              </form>
            </section>
          </article>
        </div>
      )}
    />
  );
}

export default Contact;
