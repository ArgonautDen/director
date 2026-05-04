import { useEffect, useState } from 'react';
import './Portfolio.css';
import ProjectsPage from './ProjectsPage.jsx';
import ContactPage from './ContactPage.jsx';

/* ─── DATA ─────────────────────────────────────────────── */

const NAV_LINKS = ['О себе', 'Работы', 'Проекты', 'Контакт'];

const RUBRIQ_ITEMS = [
  'Short film', 'Documentary', 'Commercial', 'Festival selection', 'Авторское кино',
];

const FILMS = [
  { id: 1, title: 'Тихий берег',   genre: 'Short film · 2023', thumb: 1 },
  { id: 2, title: 'Дом у реки',    genre: 'Documentary · 2022', thumb: 2 },
  { id: 3, title: 'Утро в городе', genre: 'Commercial · 2024',  thumb: 3 },
];

const EDUCATION = [
  { year: '2023', name: 'ВГИК им. Герасимова', sub: 'Режиссура, авторское кино' },
  { year: '2021', name: 'Мастерская Сокурова', sub: 'Авторский метод, документальное кино' },
];

const CHIPS = [
  { label: 'Кинотавр',          active: true  },
  { label: 'Artdocfest',        active: false },
  { label: 'Short Film Corner', active: true  },
  { label: 'Beat Film Fest',    active: false },
  { label: 'Зеркало',           active: false },
];

const STORY_BLOCKS = [
  {
    id: 'origin',
    tag: 'Начало',
    heading: 'Кино как разговор',
    body: [
      'Анна выросла в маленьком городе, где единственный кинотеатр закрылся, когда ей было двенадцать. Это сделало кино чем-то редким — и поэтому важным. Она начала снимать на телефон: соседей, пустые дворы, автобусные остановки в пять утра.',
      'Режиссура для неё — это прежде всего умение слушать. Не ждать нужного кадра, а позволить ему случиться.',
    ],
    photoSide: 'right',
  },
  {
    id: 'approach',
    tag: 'Подход',
    heading: 'Наблюдение без нажима',
    body: [
      'Она никогда не приходит на съёмку с готовым сценарием. Только с вопросом. Подготовка занимает месяцы — разговоры, прогулки, совместный быт с героями.',
      'Монтаж выстраивается из ритма, а не из нарратива. Пауза важнее реплики. Тишина информативнее слова.',
    ],
    photoSide: 'left',
  },
  {
    id: 'films',
    tag: 'Работа',
    heading: 'Между документом и вымыслом',
    body: [
      '«Тихий берег» — дебютный короткий метр, снятый за восемь дней на Ладоге. Отобран на «Кинотавр» и показан в программе Short Film Corner в Каннах.',
      '«Дом у реки» — трёхлетнее наблюдение за семьёй речников в Астраханской области. Фильм без голоса за кадром и без музыки.',
    ],
    photoSide: 'right',
  },
];

const TIMELINE = [
  { year: '2018', text: 'Поступление во ВГИК, мастерская документального кино' },
  { year: '2021', text: 'Интенсив в мастерской Александра Сокурова' },
  { year: '2022', text: '«Дом у реки» — три года съёмок, Астраханская область' },
  { year: '2023', text: 'Диплом ВГИКа. «Тихий берег» — Кинотавр, Канны' },
  { year: '2024', text: 'Новый проект — долгосрочное документальное наблюдение' },
];

/* ─── SHARED: NAV ───────────────────────────────────────── */

function Nav({ activePage, onNav }) {
  return (
    <nav className="portfolio__nav" aria-label="Главная навигация">
      <div className="portfolio__nav-brand" onClick={() => onNav('home')}>
        <span className="portfolio__nav-dot" aria-hidden="true" />
        <span className="portfolio__nav-name">Sokolova</span>
      </div>
      <ul className="portfolio__nav-links">
        {NAV_LINKS.map((link) => (
          <li
            key={link}
            className={activePage === link ? 'is-active' : ''}
            onClick={() => onNav(link)}
          >
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── SHARED: BOTTOM BAR ────────────────────────────────── */

function BottomBar() {
  return (
    <div className="portfolio__bar">
      <span className="portfolio__bar-text">Portfolio 2018–2024</span>
      <span className="portfolio__bar-text">Anna Sokolova — Film Director</span>
    </div>
  );
}

/* ─── HOME: sub-components ──────────────────────────────── */

function FilmCard({ film }) {
  return (
    <article className="portfolio__film">
      <div className={`portfolio__film-thumb portfolio__film-thumb--${film.thumb}`}>
        <span className="portfolio__film-num">
          {String(film.id).padStart(2, '0')} / {String(FILMS.length).padStart(2, '0')}
        </span>
        <div className="portfolio__film-play" aria-label="Воспроизвести" />
      </div>
      <div className="portfolio__film-cap">
        <p className="portfolio__film-title">{film.title}</p>
        <p className="portfolio__film-genre">{film.genre}</p>
      </div>
    </article>
  );
}

function EduRow({ year, name, sub }) {
  return (
    <div className="portfolio__edu-row">
      <span className="portfolio__edu-year">{year}</span>
      <div>
        <p className="portfolio__edu-name">{name}</p>
        <p className="portfolio__edu-sub">{sub}</p>
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────── */

function HomePage({ onNav }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`portfolio__page${visible ? ' portfolio__page--visible' : ''}`}>

      {/* MASTHEAD */}
      <header className="portfolio__header">

        {/* 1. Geo accent column — full #032734 fill */}
        <div className="portfolio__header-geo" aria-hidden="true">
          <div className="portfolio__geo-shape" />
        </div>

        {/* 2. Photo slot */}
        <div className="portfolio__header-photo" aria-label="Фото режиссёра">
          {/* Replace the div below with <img src="..." alt="Анна Соколова" /> */}
          <div className="portfolio__photo-placeholder">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="portfolio__photo-hint">Фото</span>
          </div>
        </div>

        {/* 3. Title */}
        <div className="portfolio__header-title">
          <p className="portfolio__issue">Portfolio — Vol. 01</p>
          <h1 className="portfolio__h1">
            Anna<br /><em>Sokolova</em>
          </h1>
          <p className="portfolio__sub">Film Director — Moscow / Berlin</p>
          <button className="portfolio__about-link" onClick={() => onNav('О себе')}>
            О режиссёре →
          </button>
        </div>

        {/* 4. Meta */}
        <aside className="portfolio__header-meta">
          <div className="portfolio__meta-item">
            <p className="portfolio__meta-label">Жанр</p>
            <p className="portfolio__meta-value">Documentary</p>
          </div>
          <div className="portfolio__meta-item">
            <p className="portfolio__meta-label">Период</p>
            <p className="portfolio__meta-value">2018–2024</p>
          </div>
          <div className="portfolio__meta-item">
            <p className="portfolio__meta-label">Работ</p>
            <p className="portfolio__meta-value">12</p>
          </div>
        </aside>
      </header>

      {/* RUBRIQ */}
      <div className="portfolio__rubriq" aria-label="Категории">
        {RUBRIQ_ITEMS.map((item) => (
          <span key={item} className="portfolio__rubriq-item">{item}</span>
        ))}
      </div>

      {/* SPREAD */}
      <section className="portfolio__spread" aria-label="О режиссёре">
        <div className="portfolio__col">
          <p className="portfolio__col-label">О режиссёре</p>
          <span className="portfolio__drop" aria-hidden="true">А</span>
          <p className="portfolio__body">
            нна Соколова — режиссёр документального и игрового кино.{' '}
            <strong>Выпускница ВГИКа</strong>, участница «Кинотавра» и Artdocfest.
            Её работы отбирались на российские и международные фестивали.
          </p>
          <blockquote className="portfolio__pull">
            «Я работаю с историями, которые важно рассказать —
            точно, честно и без лишнего шума.»
          </blockquote>
          <p className="portfolio__body">
            Её работы исследуют частное и публичное, тихое и громкое,
            видимое и скрытое за кадром.
          </p>
        </div>
        <div className="portfolio__spread-gutter" aria-hidden="true" />
        <div className="portfolio__col">
          <p className="portfolio__col-label">Метод</p>
          <p className="portfolio__body">
            Монтажный стиль — наблюдательный, без нажима.{' '}
            <strong>Основной инструмент — время и доверие.</strong>{' '}
            Работает в длинных экспедициях, строит связь с героями до начала съёмок.
          </p>
          <div className="portfolio__spec">
            <p className="portfolio__spec-label">Специализация</p>
            <div className="portfolio__spec-item">
              Авторское кино<br />
              Документальный нарратив<br />
              Рекламная режиссура
            </div>
          </div>
        </div>
      </section>

      {/* FILMS */}
      <div className="portfolio__films-header">
        <span className="portfolio__films-label">Избранные работы</span>
        <span className="portfolio__films-count">
          {String(FILMS.length).padStart(3, '0')} / 012
        </span>
      </div>
      <section className="portfolio__films" aria-label="Работы">
        {FILMS.map((film) => <FilmCard key={film.id} film={film} />)}
      </section>

      {/* FOOTER */}
      <footer className="portfolio__footer">
        <div className="portfolio__footer-col">
          <p className="portfolio__footer-label">Образование</p>
          {EDUCATION.map((edu) => <EduRow key={edu.year} {...edu} />)}
        </div>
        <div className="portfolio__footer-col">
          <p className="portfolio__footer-label">Показы и проекты</p>
          <div className="portfolio__chips">
            {CHIPS.map((chip) => (
              <span
                key={chip.label}
                className={`portfolio__chip${chip.active ? ' portfolio__chip--active' : ''}`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── ABOUT PAGE ────────────────────────────────────────── */

function AboutPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`about${visible ? ' about--visible' : ''}`}>

      {/* HERO */}
      <div className="about__hero">
        <div className="about__hero-content">
          <p className="about__hero-eyebrow">О режиссёре</p>
          <h1 className="about__hero-h1">
            Anna<br /><em>Sokolova</em>
          </h1>
          <p className="about__hero-sub">
            Режиссёр документального и авторского кино.<br />
            Работает с частным как с универсальным.
          </p>
        </div>

        {/* Large portrait photo + geo accent block */}
        <div className="about__hero-right">
          <div className="about__hero-geo" aria-hidden="true">
            <div className="about__geo-rect" />
            <div className="about__geo-circle" />
          </div>
          <div className="about__hero-portrait" aria-label="Портрет режиссёра">
            {/* Replace div below with <img src="..." alt="Анна Соколова" /> */}
            <div className="about__portrait-placeholder">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="11" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="about__portrait-hint">Портрет</span>
              <span className="about__portrait-sub">Анна Соколова, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUOTE BAND */}
      <div className="about__quote-band">
        <span className="about__quote-mark">"</span>
        <blockquote className="about__quote">
          Кино — это единственное место, где время можно остановить
          и рассмотреть. Я этим и занимаюсь.
        </blockquote>
      </div>

      {/* STORY BLOCKS */}
      <div className="about__story">
        {STORY_BLOCKS.map((block, i) => (
          <article
            key={block.id}
            className={`about__block about__block--${block.photoSide === 'right' ? 'img-right' : 'img-left'}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="about__block-text">
              <span className="about__block-tag">{block.tag}</span>
              <h2 className="about__block-heading">{block.heading}</h2>
              {block.body.map((para, j) => (
                <p key={j} className="about__block-body">{para}</p>
              ))}
            </div>
            <div className="about__block-photo">
              {/* Replace div below with <img src="..." alt={block.tag} /> */}
              <div className="about__story-photo-placeholder">
                <span className="about__story-photo-hint">{block.tag}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="about__timeline-section">
        <p className="about__section-label">Хронология</p>
        <div className="about__timeline">
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className="about__tl-row"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="about__tl-year">{item.year}</span>
              <div className="about__tl-dot" />
              <p className="about__tl-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─── ROOT ──────────────────────────────────────────────── */

export default function Portfolio() {
  const [activePage, setActivePage] = useState('home');

  function handleNav(target) {
    if (target === 'О себе') setActivePage('about');
    else if (target === 'Проекты') setActivePage('projects');
    else if (target === 'Контакт') setActivePage('contact');
    else setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  return (
    <div className="portfolio">
      <Nav
        activePage={activePage === 'about' ? 'О себе' : activePage === 'projects' ? 'Проекты' : 'home'}
        onNav={handleNav}
      />
      <div className="portfolio__view">
        {activePage === 'home' && <HomePage onNav={handleNav} />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'projects' && <ProjectsPage />}
        {activePage === 'contact' && <ContactPage />}
      </div>
      <BottomBar />
    </div>
  );
}
