import Card from "react-bootstrap/Card";
import styles from "../../styles/pages/home.module.scss";
import { Container } from "react-bootstrap";
import BlockQuote from "../common/blockQuote";
import heroSq from "../../assets/hero-big-sq.jpg";

const HeroContainer = () => {
  return (
    <div className={styles.heroCardContainer}>
      <Card className={styles.heroCard}>
        <img src={heroSq} className={styles.heroImg} alt="hero" />
        <Card.ImgOverlay className={styles.overlay}>
          <Container className={styles.heroContainer}>
            <Card.Body className={styles.heroCardBody}>
              <h1 className={styles.heroCardTitle}>
                Dive into the Depths <br /> of Coding Wisdom
              </h1>
            </Card.Body>
            <div className={styles.heroQuoteWrapper}>
              <BlockQuote />
            </div>
          </Container>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default HeroContainer;
