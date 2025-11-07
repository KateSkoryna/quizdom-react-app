import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import styles from "../../styles/pages/news.module.scss";
import { FormEvent, ChangeEvent } from "react";

type Params = {
  query?: string;
  category?: string;
};

type SearchFormProps = {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setSearchParams: (params: Params) => void;
  errorState: boolean;
  setErrorState: (errorState: boolean) => void;
};

const SearchForm = ({
  category,
  query,
  setQuery,
  errorState,
  setErrorState,
  setSearchParams,
}: SearchFormProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      setQuery("");
      setErrorState(true);
      return;
    }
    if (category) {
      setErrorState(false);
      setSearchParams({ query, category });
    } else {
      setErrorState(false);
      setSearchParams({ query });
    }
  };
  return (
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
      {errorState && (
        <Form.Text className={styles.error}>
          Please enter a search term
        </Form.Text>
      )}
    </Form>
  );
};

export default SearchForm;
