import { useState } from "react";
import GameLevel from "../components/GameLevel";
import InteractiveDocument from "../components/InteractivePaper";
import JournalHeader from "../components/JournalHeader";

function Contact() {
  const [open, setOpen] = useState(false);

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
            <section className="document-entry contact-details">
              <h2>E-mail</h2><a href="mailto:caio.santos.software@gmail.com">caio.santos.software@gmail.com</a>
              <h2>LinkedIn</h2><a href="https://linkedin.com/in/caio-santos-borges-792591362/" target="_blank" rel="noreferrer">Caio Santos Borges</a>
              <h2>GitHub</h2><a href="https://github.com/cayo-puc" target="_blank" rel="noreferrer">@cayo-puc</a>
              <h2>Localização</h2><p>Belo Horizonte — MG, Brasil</p>
            </section>
          </article>
        </div>
      )}
    />
  );
}

export default Contact;
