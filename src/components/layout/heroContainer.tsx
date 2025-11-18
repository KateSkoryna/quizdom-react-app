import Card from "react-bootstrap/Card";
import styles from "../../styles/pages/home.module.scss";
import hero from "../../assets/hero-big.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Container } from "react-bootstrap";
import BlockQuote from "../common/blockQuote";

const HeroContainer = () => {
  return (
    <Card className={styles.heroCard}>
      <LazyLoadImage src={hero} className={styles.heroImg} alt="hero" />
      <Card.ImgOverlay className={styles.overlay}>
        <Container>
          <Card.Body className={styles.heroCardBody}>
            <Card.Title className={styles.heroCardTitle}>
              Dive into the Depths <br /> of Coding Wisdom
              <BlockQuote />
            </Card.Title>
          </Card.Body>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

export default HeroContainer;
