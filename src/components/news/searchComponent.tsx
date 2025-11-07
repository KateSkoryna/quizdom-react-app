import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import styles from "../../styles/pages/news.module.scss";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import SearchForm from "../forms/searchForm";

const initState = {
  query: "",
  category: "",
};

const SearchComponent = ({ categories }: { categories: string[] }) => {
  const [searchParams, setSearchParams] = useSearchParams(initState);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [errorState, setErrorState] = useState(false);

  function handleCategoryClick(category: string): void {
    setCategory(category);
    setQuery("");
    setSearchParams({ category });
  }

  return (
    <Container className={styles.formContainer}>
      <SearchForm
        query={query}
        category={category}
        errorState={errorState}
        setQuery={setQuery}
        setSearchParams={setSearchParams}
        setErrorState={setErrorState}
      />
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

export default SearchComponent;
