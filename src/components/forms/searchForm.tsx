import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import styles from "../../styles/pages/news.module.scss";
import { FormEvent, ChangeEvent, useState } from "react";

type Params = {
  query?: string;
  category?: string;
};

type SearchFormProps = {
  query: string;
  category: string;
  setSearchParams: (params: Params) => void;
};

const SearchForm = ({ query, category, setSearchParams }: SearchFormProps) => {
  const [errorState, setErrorState] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: event.target.value, category });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      setErrorState(true);
      return;
    }

    setErrorState(false);
    setSearchParams({ query: query.trim(), category });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <div className={styles.serchContainer}>
        <FormControl
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={handleChange}
          className={styles.searchInput}
        />
        <Button className={styles.searchBtn} type="submit">
          Search
        </Button>
      </div>
      {errorState && <Form.Text className={styles.error}>Please enter a search term</Form.Text>}
    </Form>
  );
};

export default SearchForm;
