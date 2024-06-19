import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
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

export const SearchComponent = ({ categories }: { categories: string[] }) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Container className={styles.formContainer}>
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className={styles.serchContainer}>
          <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query || ""}
            onChange={handleChange}
            className={styles.searchInput}
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
        {categories.map((category) => (
          <Nav.Item key={category}>
            <Nav.Link
              as={Button}
              onClick={() => handleCategoryClick(category)}
              className={styles.categoryBtn}
            >
              {category}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};
