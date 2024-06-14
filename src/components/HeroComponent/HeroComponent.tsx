import Card from "react-bootstrap/Card";
import { JOKE } from "../../helpers/jokes";
import styles from "./HeroComponent.module.css";
import hero from "../../assets/hero-big.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const HeroComponent = () => {
  return (
    <Card className={styles.heroCard}>
      <LazyLoadImage src={hero} className={styles.heroImg} alt="hero" />
      <Card.ImgOverlay className={styles.overlay}>
        <div className={styles.heroBodyContainer}>
          <Card.Body className={styles.cardBody}>
            <Card.Title className={styles.heroCardTitle}>
              Dive into the Depths <br /> of Coding Wisdom
            </Card.Title>
            <blockquote className="mb-0 fs-4 d-block">
              <p
                className={
                  JOKE.joke.length > 100
                    ? styles.heroJokeTextBig
                    : styles.heroJokeText
                }
              >
                {JOKE.joke}
              </p>
              <footer
                className={styles.heroJokeAuthor}
              >{`— ${JOKE.author}`}</footer>
            </blockquote>
          </Card.Body>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};
