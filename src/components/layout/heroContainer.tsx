import { Container } from "react-bootstrap";
import { MdAutoAwesome, MdCheckCircle, MdSearch, MdArrowDownward } from "react-icons/md";
import styles from "../../styles/pages/home.module.scss";
import BlockQuote from "../common/blockQuote";
import heroSq from "../../assets/hero2-sq.webp";
import knight from "../../assets/knight.svg";
import circle from "../../assets/circle.svg";
import triangle from "../../assets/triangle.svg";
import zigzag from "../../assets/line.svg";
import queen from "../../assets/queen.svg";
import { QUIZ_SECTION_ID, QUIZ_SEARCH_INPUT_ID } from "../../const/const";

const FEATURES = ["AI quiz builder", "Semantic search", "Progress stats"];

type Decoration = { src: string; className: string };

const AROUND_DECORATIONS: Decoration[] = [
  { src: circle, className: "decoCircle" },
  { src: triangle, className: "decoTriangle" },
  { src: zigzag, className: "decoZigzag" },
];

const BEHIND_PHOTO_DECORATIONS: Decoration[] = [
  { src: circle, className: "sceneBackRing" },
  { src: queen, className: "sceneBackQueen" },
];

const OVER_PHOTO_DECORATIONS: Decoration[] = [
  { src: knight, className: "sceneFrontKnight" },
  { src: triangle, className: "sceneFrontTriangle" },
];

const renderDecorations = (decorations: Decoration[]) =>
  decorations.map(({ src, className }) => (
    <img key={className} src={src} className={styles[className]} alt="" aria-hidden="true" />
  ));

const HeroContainer = () => {
  const scrollToQuizzes = () => {
    document
      .getElementById(QUIZ_SECTION_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const focusSearch = () => {
    document.getElementById(QUIZ_SEARCH_INPUT_ID)?.focus();
  };

  return (
    <Container as="section" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        {renderDecorations(AROUND_DECORATIONS)}
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <MdAutoAwesome aria-hidden="true" />
            Coding quizzes, powered by AI
          </span>
          <h1 id="hero-title" className={styles.heroTitle}>
            Dive into the depths of <span className={styles.heroTitleAccent}>coding wisdom</span>
          </h1>
          <p className={styles.heroLead}>
            Sharpen your JavaScript, React and TypeScript skills with bite-sized quizzes — or let AI
            build one on any topic in seconds.
          </p>
          <div className={styles.heroActions}>
            <button type="button" className={styles.heroPrimary} onClick={scrollToQuizzes}>
              Explore quizzes
              <MdArrowDownward aria-hidden="true" />
            </button>
            <button type="button" className={styles.heroSecondary} onClick={focusSearch}>
              <MdSearch aria-hidden="true" />
              Find a topic
            </button>
          </div>
          <ul className={styles.heroFeatures}>
            {FEATURES.map((feature) => (
              <li key={feature}>
                <MdCheckCircle aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroOrbit} aria-hidden="true" />
          <div className={styles.heroPhoto}>
            <span className={`${styles.orb} ${styles.orbBack}`} aria-hidden="true" />
            {renderDecorations(BEHIND_PHOTO_DECORATIONS)}
            <div className={styles.heroImageFrame}>
              <img
                src={heroSq}
                className={styles.heroImg}
                alt=""
                width={380}
                height={380}
                fetchPriority="high"
                loading="eager"
              />
            </div>
            {renderDecorations(OVER_PHOTO_DECORATIONS)}
            <span className={`${styles.orb} ${styles.orbFront}`} aria-hidden="true" />
          </div>
          <div className={`${styles.floatCard} ${styles.floatScore}`} aria-hidden="true">
            <MdCheckCircle className={styles.floatScoreIcon} />
            <span>
              <strong>Quiz complete</strong>
              <small>9/10 correct</small>
            </span>
          </div>
          <figure className={`${styles.floatCard} ${styles.floatQuote}`}>
            <figcaption className={styles.floatQuoteLabel}>Dev wisdom</figcaption>
            <BlockQuote />
          </figure>
        </div>
      </div>
    </Container>
  );
};

export default HeroContainer;
