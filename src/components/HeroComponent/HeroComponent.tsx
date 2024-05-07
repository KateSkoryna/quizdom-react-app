import Card from "react-bootstrap/Card";
import hero from "../../assets/hero.jpg";
import Container from "react-bootstrap/esm/Container";

export const HeroComponent = () => {
  return (
    <Card className="bg-light text-dark">
      <Card.Img src={hero} alt="Card image" />
      <Card.ImgOverlay>
        <Container>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};
