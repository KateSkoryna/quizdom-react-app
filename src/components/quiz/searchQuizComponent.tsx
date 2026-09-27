import { Button, Form } from "react-bootstrap";
import styles from "../../styles/pages/home.module.scss";
import modalStyles from "../../styles/components/modal.module.scss";
import FormDropdownComponent from "../forms/formDropdownComponent";
import { useSearchParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "react-bootstrap";
import { getConfigByFieldName } from "../../const/complexity";

type SearchFormData = {
  q: string;
  category: string;
  complexity: string;
};

// Matches the searchQuizzes API limit
const MAX_QUERY_LENGTH = 300;

const SearchQuizComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const methods = useForm<SearchFormData>({
    defaultValues: {
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "All",
      complexity: searchParams.get("complexity") ?? "All",
    },
  });

  const { handleSubmit, register } = methods;

  const onSubmit = (data: SearchFormData) => {
    const params: Record<string, string> = {};
    const q = data.q.trim();
    if (q) params.q = q;
    if (data.category && data.category !== "All") params.category = data.category;
    if (data.complexity && data.complexity !== "All") params.complexity = data.complexity;
    setSearchParams(params);
  };

  // Get base configs and add "All" option
  const complexityConfig = getConfigByFieldName("complexity");
  const categoryConfig = getConfigByFieldName("category");

  const complexityOptions = [{ value: "All", label: "All" }, ...complexityConfig.options];
  const categoryOptions = [{ value: "All", label: "All" }, ...categoryConfig.options];

  const formatComplexity = (value: string) =>
    value === "All" ? "All" : complexityConfig.formatDisplayValue(value);
  const formatCategory = (value: string) =>
    value === "All" ? "All" : categoryConfig.formatDisplayValue(value);

  return (
    <Container>
      <FormProvider {...methods}>
        <Form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="q">
            <Form.Label className={modalStyles.formLabel}>Search</Form.Label>
            <Form.Control
              type="search"
              placeholder="Describe the quiz you want, e.g. easy React hooks"
              maxLength={MAX_QUERY_LENGTH}
              className={modalStyles.formInput}
              {...register("q")}
            />
          </Form.Group>
          <div className={styles.form}>
            <FormDropdownComponent
              name="complexity"
              label="Complexity"
              options={complexityOptions}
              formatDisplayValue={formatComplexity}
              className={styles.selectCategory}
            />
            <FormDropdownComponent
              name="category"
              label={categoryConfig.label}
              options={categoryOptions}
              formatDisplayValue={formatCategory}
              className={styles.selectCategory}
            />
            <div className={styles.buttonContainer} style={{ alignSelf: "flex-end" }}>
              <Button className={`${modalStyles.primaryButton} ${styles.button}`} type="submit">
                Search
              </Button>
            </div>
          </div>
        </Form>
      </FormProvider>
    </Container>
  );
};

export default SearchQuizComponent;
