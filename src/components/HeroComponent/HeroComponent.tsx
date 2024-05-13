import Card from "react-bootstrap/Card";
import { HeroComponentProps } from "../../types/types";
import hero from "../../assets/hero.jpg";
import Container from "react-bootstrap/esm/Container";


export const HeroComponent = ({ joke, hero, person }: HeroComponentProps) => {
  return (
    <Card className="bg-light text-dark">
      <Card.Img src={hero} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Dive into the Depths of Coding Wisdom</Card.Title>
        <Card.Text>{joke}</Card.Text>
        <Card.Text>{person}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};
