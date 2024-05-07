import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { CATEGORY } from "../../const/const";
import Container from "react-bootstrap/esm/Container";

export const SearchNavBar = () => {
  const values = Object.values(CATEGORY);
  return (
    <Container className="my-5">
      <Nav className="d-flex justify-content-center gap-5">
        {values.map((category: string) => (
          <Nav.Item key={category}>
            <Nav.Link
              as={Button}
              className="text-light"
              style={{ width: "10rem" }}
            >
              {category}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};
