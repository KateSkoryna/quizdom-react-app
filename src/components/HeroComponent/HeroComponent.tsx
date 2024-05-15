import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { JOKE } from "../../helpers/jokes";
import styles from "./HeroComponent.module.css";

export const HeroComponent = () => {
  return (
    <Card className={styles.heroCard}>
      <Card.ImgOverlay>
        <Container>
          <Card.Title className={styles.heroCardTitle}>
            Dive into the Depths of Coding Wisdom
          </Card.Title>
          <Card.Text className={styles.heroText}>{JOKE.joke}</Card.Text>
          <Card.Text className={styles.heroText}>{JOKE.author}</Card.Text>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};
