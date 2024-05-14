import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import hero from "../../assets/hero.jpg";
import { JOKE } from "../../helpers/jokes";

export const HeroComponent = () => {
  return (
    <Card className="bg-light text-dark hero-card">
      <Card.Img src={hero} alt="Card image" />
      <Card.ImgOverlay>
        <Container>
          <Card.Title className="hero-card-title">Dive into the Depths of Coding Wisdom</Card.Title>
          <Card.Text>{JOKE.joke}</Card.Text>
          <Card.Text>{JOKE.author}</Card.Text>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};
