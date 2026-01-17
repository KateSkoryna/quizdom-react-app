import { Button, Form } from "react-bootstrap";
import styles from "../../styles/pages/home.module.scss";
import modalStyles from "../../styles/components/modal.module.scss";
import FormDropdownComponent from "../forms/formDropdownComponent";
import { useSearchParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "react-bootstrap";
import { getConfigByFieldName } from "../../const/complexity";

type SearchFormData = {
  category: string;
  complexity: string;
};

const SearchQuizComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const methods = useForm<SearchFormData>({
    defaultValues: {
      category: searchParams.get("category") ?? "All",
      complexity: searchParams.get("complexity") ?? "All",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: SearchFormData) => {
    const params: Record<string, string> = {};
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
        <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        </Form>
      </FormProvider>
    </Container>
  );
};

export default SearchQuizComponent;
