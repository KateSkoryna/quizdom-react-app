import { Container, Form } from "react-bootstrap";
import styles from "./SearchQuizComponent.module.css";
import { QUIZ_CATEGORY, COMPLEXITY_VALUES } from "../../const/const";
import { FormSelectComponent } from "../FormSelectComponent/FormSelectComponent";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const categories = Object.values(QUIZ_CATEGORY);
const complexityValues = Object.values(COMPLEXITY_VALUES);
const initState = { category: "", complexity: "" };

export const SearchQuizComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams(initState);
  const [, setCategory] = useState(searchParams.get("category") ?? "");
  const [, setComplexity] = useState(searchParams.get("complexity") ?? "");

  const handleChangeCategory = (value: string) => {
    if (value === "Open category menu") {
      return;
    }
    setCategory(value);
    setSearchParams((prev) => {
      return { ...prev, category: value };
    });
  };

  const handleChangeComplexity = (value: string) => {
    if (value === "Open category menu") {
      return;
    }
    setComplexity(value);
    setSearchParams((prev) => {
      return { ...prev, complexity: value };
    });
  };

  return (
    <Container className={styles.container}>
      <Form className={styles.form}>
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
      </Form>
    </Container>
  );
};
