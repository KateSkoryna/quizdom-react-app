import { Button, Container, Form } from "react-bootstrap";
import styles from "../../styles/pages/home.module.scss";
import modalStyles from "../../styles/components/modal.module.scss";
import FormSelectComponent from "../forms/formSelectComponent";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { COMPLEXITY_VALUES, QUIZ_CATEGORY } from "../../const/complexity";

const categories = Object.values(QUIZ_CATEGORY);
const complexityValues = Object.values(COMPLEXITY_VALUES);

type SearchFormData = {
  category: string;
  complexity: string;
};

const SearchQuizComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      category: searchParams.get("category") ?? "All",
      complexity: searchParams.get("complexity") ?? "All",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const params: Record<string, string> = {};
    if (data.category && data.category !== "All") params.category = data.category;
    if (data.complexity && data.complexity !== "All") params.complexity = data.complexity;
    setSearchParams(params);
  };

  return (
    <Container>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormSelectComponent fields={categories} fieldsName="category" control={control} />
        <FormSelectComponent fields={complexityValues} fieldsName="complexity" control={control} />
        <Button className={modalStyles.primaryButton} type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default SearchQuizComponent;
