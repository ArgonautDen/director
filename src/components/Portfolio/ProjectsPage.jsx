import { useEffect, useState } from 'react';
import './ProjectsPage.css';

/* ─── DATA ──────────────────────────────────────────────────
   Замените videoSrc на реальные пути к файлам или YouTube/Vimeo.
   poster — превью-кадр для <video>, тоже заменяется на реальное фото.
─────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'tihy-bereg',
    index: '01',
    title: 'Тихий берег',
    year: '2023',
    genre: 'Короткий метр',
    duration: '12 мин',
    location: 'Ладога, Россия',
    videoSrc: null,            // замените на './videos/tihy-bereg.mp4' или embed URL
    poster: null,              // замените на './img/poster-1.jpg'
    thumb: 1,
    description:
      'Восемь дней на берегу Ладожского озера. Фильм о женщине, которая каждое утро приходит к воде и ни разу не заходит в неё.',
    details:
      'Снят на 16 мм плёнку. Мировая премьера на «Кинотавре», программа короткого метра. Отобран на Short Film Corner в Каннах, показан на Beat Film Festival.',
    awards: ['Кинотавр 2023', 'Short Film Corner, Cannes'],
  },
  {
    id: 'dom-u-reki',
    index: '02',
    title: 'Дом у реки',
    year: '2022',
    genre: 'Документальное',
    duration: '58 мин',
    location: 'Астраханская область',
    videoSrc: null,
    poster: null,
    thumb: 2,
    description:
      'Трёхлетнее наблюдение за семьёй речников на Волге. Без голоса за кадром, без музыки — только время и река.',
    details:
      'Съёмки велись тремя экспедициями по 3–4 месяца. Монтаж занял год. Фильм показан на Artdocfest и фестивале «Зеркало».',
    awards: ['Artdocfest 2022', 'Фестиваль «Зеркало»'],
  },
  {
    id: 'utro-v-gorode',
    index: '03',
    title: 'Утро в городе',
    year: '2024',
    genre: 'Рекламный',
    duration: '3 мин',
    location: 'Москва',
    videoSrc: null,
    poster: null,
    thumb: 3,
    description:
      'Рекламный фильм для архитектурного бюро. Город в пять утра — как он существует до людей.',
    details:
      'Съёмка в течение двух недель в разное время суток. Специальный грант на производство.',
    awards: [],
  },
  {
    id: 'pole',
    index: '04',
    title: 'Поле',
    year: '2021',
    genre: 'Экспериментальное',
    duration: '22 мин',
    location: 'Курская область',
    videoSrc: null,
    poster: null,
    thumb: 1,
    description:
      'Учебная работа, ставшая фестивальной. Поле подсолнухов как метафора ожидания.',
    details:
      'Дипломный проект мастерской ВГИК. Отмечен на смотре студенческих работ.',
    awards: ['ВГИК — лучший студенческий фильм 2021'],
  },
];

/* ─── ACCORDION ITEM ────────────────────────────────────── */

function ProjectItem({ project, isOpen, onOpen, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`proj__item${isOpen ? ' proj__item--open' : ''}${hovered && !isOpen ? ' proj__item--hover' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="proj__strip">
        <span className="proj__strip-index">{project.index}</span>
        <h2 className="proj__strip-title">{project.title}</h2>
        <span className="proj__strip-genre">{project.genre}</span>
        <span className="proj__strip-year">{project.year}</span>
        <div className="proj__strip-arrow" aria-hidden="true">
          <div className="proj__arrow-icon" />
        </div>
      </div>

      {/* ── expanded panel ── */}
      <div className="proj__panel">
        <div className="proj__panel-inner">

          {/* Left: meta + description */}
          <div className="proj__panel-left">
            <div className="proj__meta-row">
              <span className="proj__meta-label">Жанр</span>
              <span className="proj__meta-value">{project.genre}</span>
            </div>
            <div className="proj__meta-row">
              <span className="proj__meta-label">Год</span>
              <span className="proj__meta-value">{project.year}</span>
            </div>
            <div className="proj__meta-row">
              <span className="proj__meta-label">Хронометраж</span>
              <span className="proj__meta-value">{project.duration}</span>
            </div>
            <div className="proj__meta-row">
              <span className="proj__meta-label">Локация</span>
              <span className="proj__meta-value">{project.location}</span>
            </div>

            <p className="proj__desc">{project.description}</p>
            <p className="proj__details">{project.details}</p>

            {project.awards.length > 0 && (
              <div className="proj__awards">
                <p className="proj__awards-label">Показы и награды</p>
                <div className="proj__awards-list">
                  {project.awards.map((a) => (
                    <span key={a} className="proj__award-chip">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: video */}
          <div className="proj__panel-right">
            <div className="proj__video-wrap">
              {project.videoSrc ? (
                <video
                  className="proj__video"
                  src={project.videoSrc}
                  poster={project.poster}
                  controls
                  preload="none"
                  playsInline
                />
              ) : (
                /* Placeholder — убрать когда добавите реальное видео */
                <div className={`proj__video-placeholder proj__video-placeholder--${project.thumb}`}>
                  <div className="proj__placeholder-play">
                    <div className="proj__placeholder-triangle" />
                  </div>
                  <span className="proj__placeholder-label">
                    {project.title}<br />
                    <span className="proj__placeholder-sub">{project.duration} · {project.year}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */

export default function ProjectsPage() {
  const [openId, setOpenId] = useState(PROJECTS[0].id); // первый открыт по умолчанию
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleOpen(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={`proj${visible ? ' proj--visible' : ''}`}>

      {/* ── Page header ── */}
      <div className="proj__header">
        <div className="proj__header-geo" aria-hidden="true">
          <div className="proj__geo-bar" />
        </div>
        <div className="proj__header-text">
          <p className="proj__header-eyebrow">Работы</p>
          <h1 className="proj__header-h1">Projects</h1>
        </div>
        <div className="proj__header-count">
          <span className="proj__header-num">{String(PROJECTS.length).padStart(2, '0')}</span>
          <span className="proj__header-num-label">Работ</span>
        </div>
      </div>

      {/* ── Column headers ── */}
      <div className="proj__cols-head">
        <span className="proj__ch proj__ch--index">#</span>
        <span className="proj__ch proj__ch--title">Название</span>
        <span className="proj__ch proj__ch--genre">Жанр</span>
        <span className="proj__ch proj__ch--year">Год</span>
        <span className="proj__ch proj__ch--arrow" />
      </div>

      {/* ── Accordion list ── */}
      <div className="proj__list">
        {PROJECTS.map((project, i) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={i}
            isOpen={openId === project.id}
            onOpen={() => handleOpen(project.id)}
          />
        ))}
      </div>

    </div>
  );
}