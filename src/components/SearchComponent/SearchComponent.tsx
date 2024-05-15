import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { CATEGORY } from "../../const/const";
import Container from "react-bootstrap/esm/Container";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import styles from "./SearchComponent.module.css";

export const SearchComponent = () => {
  const values = Object.values(CATEGORY);
  return (
    <Container className={styles.formContainer}>
      <Form className="d-flex w-50 mb-4 mx-auto">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button className={styles.searchBtn} type="submit">
          Search
        </Button>
      </Form>
      <Nav className={styles.searchNavbar}>
        {values.map((category: string) => (
          <Nav.Item key={category}>
            <Nav.Link as={Button} className={styles.categoryBtn}>
              {category}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};
