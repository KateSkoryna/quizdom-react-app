import { Button, Container, Form } from "react-bootstrap";
import styles from "./SearchQuizComponent.module.css";
import { QUIZ_CATEGORY, COMPLEXITY_VALUES } from "../../../const/const";
import { FormSelectComponent } from "../FormSelectComponent/FormSelectComponent";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const categories = Object.values(QUIZ_CATEGORY);
const complexityValues = Object.values(COMPLEXITY_VALUES);
const initState = { category: "", complexity: "" };

export const SearchQuizComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams(initState);
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [complexity, setComplexity] = useState(
    searchParams.get("complexity") ?? ""
  );
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!category && !complexity) {
      setError(true);
      return;
    }
    setSearchParams({ category, complexity });
  };

  const handleChangeCategory = (value: string) => {
    console.log(value);
    if (value === "Open category menu") {
      setCategory("");
      return;
    }
    setError(false);
    setCategory(value);
  };

  const handleChangeComplexity = (value: string) => {
    console.log(value);
    if (value === "Open complexity menu") {
      setComplexity("");
      return;
    }
    setError(false);
    setComplexity(value);
  };

  return (
    <Container className={styles.container}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormSelectComponent
          fields={categories}
          fieldsName="category"
          handleChange={handleChangeCategory}
        />
        <FormSelectComponent
          fields={complexityValues}
          fieldsName="complexity"
          handleChange={handleChangeComplexity}
        />
        <Button className={styles.button} type="submit">
          Search
        </Button>
      </Form>
      {error && <p className={styles.error}>Please select search query</p>}
    </Container>
  );
};
