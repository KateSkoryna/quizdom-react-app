import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { CATEGORY } from "../../const/const";
import Container from "react-bootstrap/esm/Container";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import styles from "./SearchComponent.module.css";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";

const initState = {
  query: "",
  category: "",
};

export const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams(initState);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query) {
      setQuery("");
      setError(true);
      return;
    }
    if (category) {
      setError(false);
      setSearchParams({ query, category });
    } else {
      setError(false);
      setSearchParams({ query });
    }
  }

  function handleCategoryClick(category: string): void {
    setCategory(category);
    setQuery("");
    setSearchParams({ category });
  }

  return (
    <Container className={styles.formContainer}>
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="d-flex w-50 mb-1 mx-auto">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query || ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
          />
          <Button className={styles.searchBtn} type="submit">
            Search
          </Button>
        </div>
        {error && (
          <Form.Text className={styles.error}>
            Please enter a search term
          </Form.Text>
        )}
      </Form>
      <Nav className={styles.searchNavbar}>
        {CATEGORY.map((category) => (
          <Nav.Item key={category.id}>
            <Nav.Link
              as={Button}
              onClick={() => handleCategoryClick(category.type)}
              className={styles.categoryBtn}
            >
              {category.type}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};
