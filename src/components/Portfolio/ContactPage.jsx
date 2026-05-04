import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`contact${visible ? ' contact--visible' : ''}`} style={{ fontFamily: 'var(--font-sans)' }}>
      
      {/* Хедер */}
      <header className="contact__header">
        <div className="contact__geo" aria-hidden="true">
          <div className="contact__geo-shape" />
        </div>
        <div className="contact__header-text">
          <p className="contact__eyebrow">Контакт</p>
          <h1 className="contact__h1">Связаться</h1>
          <p className="contact__sub">
            Буду рада сотрудничеству и новым проектам.<br />
            Свяжитесь со мной любым удобным способом!
          </p>
        </div>
      </header>

      {/* Контент с контактами */}
      <section className="contact__content">
        <div className="contact__info-item">
          <strong>Email:</strong>
          <a href="mailto:anna.sokolova@example.com" className="contact__link">anna.sokolova@example.com</a>
        </div>

        <div className="contact__info-item">
          <strong>Телефон:</strong>
          <a href="tel:+79161234567" className="contact__link">+7 916 123-45-67</a>
        </div>

        <div className="contact__info-item">
          <strong>Instagram:</strong>
          <a href="https://instagram.com/anna.sokolova" target="_blank" rel="noopener noreferrer" className="contact__link">
            @anna.sokolova
          </a>
        </div>

        <div className="contact__info-item">
          <strong>Telegram:</strong>
          <a href="https://t.me/anna_sokolova" target="_blank" rel="noopener noreferrer" className="contact__link">
            @anna_sokolova
          </a>
        </div>
      </section>
    </div>
  );
}