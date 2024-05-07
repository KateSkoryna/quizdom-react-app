import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import image from "../../assets/hero.jpg";
import FormControl from "react-bootstrap/esm/FormControl";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

export const SearchComponent = () => {
  return (
    <Card className="bg-light text-dark mb-4">
      <Card.Img src={image} alt="Card image" />
      <Card.ImgOverlay>
        <Container>
          <Card.Title>Search</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Form className="d-flex mx-auto" style={{ width: "60rem" }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit">Search</Button>
          </Form>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};
