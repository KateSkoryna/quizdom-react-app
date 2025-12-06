import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import {
  QuizFormState,
  QuizFormProps,
  Complexity,
  QuizCategory,
} from "../../types/types";
import { Container } from "react-bootstrap";
import FormRangeComponent from "./formRangeComponent";
import FormCategoryComponent from "./formCategoryComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import addClassnameToText from "../../helpers/addClassnameToText";
import modalStyles from "../../styles/components/modal.module.scss";
import { useAuthStore } from "../../store/AuthStore";
import { addQuiz } from "../../fetchers/api";
import { forwardRef, useImperativeHandle, useEffect } from "react";

const defaultValues: QuizFormState = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      questionTitle: "",
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
      ],
    },
  ],
};

const QuizFormComponent = forwardRef<
  { submit: () => void; isSubmitting: boolean; isDirty: boolean },
  QuizFormProps
>(({ handleClose, onFormStateChange }, ref) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = methods;

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(handleFormSubmit)();
    },
    isSubmitting,
    isDirty,
  }));

  // Notify parent of form state changes
  useEffect(() => {
    onFormStateChange?.({ isDirty, isSubmitting });
  }, [isDirty, isSubmitting, onFormStateChange]);

  const handleFormSubmit = async (data: QuizFormState): Promise<void> => {
    if (currentUser) {
      await addQuiz(data, currentUser?.id, currentUser?.name, setError);
      reset();
      handleClose();
    }
  };

  const errorTitle = errors.title?.message;
  const errorDescription = errors.description?.message;

  return (
    <Container className={modalStyles.formContainer}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className={modalStyles.formGroup} controlId="div-title">
            <Form.Label className={modalStyles.formLabel}>Quiz Title</Form.Label>
            <Form.Control
              className={modalStyles.formInput}
              {...register("title", {
                required: "Title is required",
                minLength: 8,
              })}
              type="text"
              placeholder="Best Quiz ever..."
            />
            {errorTitle && addClassnameToText("text-danger", errorTitle as string)}
          </Form.Group>
          <Form.Group className={modalStyles.formGroup} controlId="div-description">
            <Form.Label className={modalStyles.formLabel}>Quiz Description</Form.Label>
            <Form.Control
              className={modalStyles.formTextarea}
              {...register("description", {
                required: "Description is required",
                minLength: 8,
              })}
              as="textarea"
              rows={3}
            />
            {errorDescription && addClassnameToText("text-danger", errorDescription as string)}
          </Form.Group>
          <div className={modalStyles.dropdownRow}>
            <FormRangeComponent fieldName="complexity" />
            <FormCategoryComponent fieldName="category" />
          </div>
          <QuestionsFormComponent />
        </Form>
      </FormProvider>
    </Container>
  );
});

QuizFormComponent.displayName = "QuizFormComponent";

export default QuizFormComponent;
