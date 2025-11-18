import Card from "react-bootstrap/Card";
import styles from "../../styles/pages/home.module.scss";
import { Container } from "react-bootstrap";
import BlockQuote from "../common/blockQuote";
import ResponsiveImage from "../common/responsiveImage";

const HeroContainer = () => {
  return (
    <Card className={styles.heroCard}>
      <ResponsiveImage className={styles.heroImg} alt="hero" />
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
