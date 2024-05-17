import Card from "react-bootstrap/Card";
import { JOKE } from "../../helpers/jokes";
import styles from "./HeroComponent.module.css";

export const HeroComponent = () => {
  return (
    <Card className={styles.heroCard}>
      <Card.ImgOverlay className={styles.overlay}>
        <Card.Body className=" h-100 p-0 d-flex flex-column justify-content-evenly align-items-start">
          <Card.Title className={styles.heroCardTitle}>
            Dive into the Depths <br /> of Coding Wisdom
          </Card.Title>
          <blockquote className="mb-0 fs-4">
            <p className={styles.heroJokeText}>{JOKE.joke}</p>
            <footer
              className={styles.heroJokeAuthor}
            >{`— ${JOKE.author}`}</footer>
          </blockquote>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
};
