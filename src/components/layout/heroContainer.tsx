import Card from "react-bootstrap/Card";
import { JOKE } from "../../helpers/jokes";
import styles from "../../styles/pages/home.module.scss";
import hero from "../../assets/hero-big.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Container } from "react-bootstrap";

const HeroContainer = () => {
  return (
    <Card className={styles.heroCard}>
      <LazyLoadImage src={hero} className={styles.heroImg} alt="hero" />

      <Card.ImgOverlay className={styles.overlay}>
        <Container>
          <Card.Body className={styles.heroCardBody}>
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
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

export default HeroContainer;
