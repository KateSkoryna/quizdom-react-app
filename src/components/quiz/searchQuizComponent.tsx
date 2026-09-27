import { Button, Form } from "react-bootstrap";
import styles from "../../styles/pages/home.module.scss";
import modalStyles from "../../styles/components/modal.module.scss";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";

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
        <Form.Group controlId="q">
          <Form.Label className={modalStyles.formLabel}>Search</Form.Label>
          <div className={styles.searchRow}>
            <Form.Control
              type="search"
              placeholder="Describe the quiz you want, e.g. easy JavaScript or advanced React hooks"
              maxLength={MAX_QUERY_LENGTH}
              className={`${modalStyles.formInput} ${styles.searchInput}`}
              {...register("q")}
            />
            <Button className={`${modalStyles.primaryButton} ${styles.button}`} type="submit">
              Search
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SearchQuizComponent;
