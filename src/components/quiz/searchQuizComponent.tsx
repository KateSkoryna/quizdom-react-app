import { Button, Form } from "react-bootstrap";
import styles from "../../styles/pages/home.module.scss";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { QUIZ_SEARCH_INPUT_ID } from "../../const/const";

type SearchFormData = {
  q: string;
};

// Matches the searchQuizzes API limit
const MAX_QUERY_LENGTH = 300;

const SearchQuizComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSubmit, register } = useForm<SearchFormData>({
    defaultValues: { q: searchParams.get("q") ?? "" },
  });

  // Topic and difficulty are read from the text by the search API
  const onSubmit = ({ q }: SearchFormData) => {
    const query = q.trim();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId={QUIZ_SEARCH_INPUT_ID}>
          <Form.Label className="visually-hidden">Search quizzes</Form.Label>
          <div className={styles.searchBar}>
            <MdSearch className={styles.searchIcon} aria-hidden="true" />
            <Form.Control
              type="search"
              placeholder="Describe the quiz you want, e.g. easy JavaScript or advanced React hooks"
              maxLength={MAX_QUERY_LENGTH}
              className={styles.searchInput}
              {...register("q")}
            />
            <Button className={styles.searchButton} type="submit">
              Search
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SearchQuizComponent;
