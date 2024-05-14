import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { CATEGORY } from "../../const/const";
import Container from "react-bootstrap/esm/Container";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";

export const SearchComponent = () => {
  const values = Object.values(CATEGORY);
  return (
    <Container className="form-container">
      <Form className="d-flex mx-auto mb-4">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button type="submit">Search</Button>
      </Form>
      <Nav className="search-navbar">
        {values.map((category: string) => (
          <Nav.Item key={category}>
            <Nav.Link as={Button} className="category-btn">
              {category}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};
