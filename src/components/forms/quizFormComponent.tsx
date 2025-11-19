import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { QuizFormState, QuizFormProps } from "../../types/types";
import { Button, Container } from "react-bootstrap";
import FormRangeComponent from "./formRangeComponent";
import FormCategoryComponent from "./formCategoryComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "../../styles/pages/home.module.scss";
import { useSetQuizForm } from "../../store/store";
import { useAuthStore } from "../../store/AuthStore";
import { addQuiz } from "../../API/api";

const QuizFormComponent = ({ handleClose }: QuizFormProps) => {
  const quizData = useSetQuizForm((state) => state.newQuizData);
  const setQuizFormData = useSetQuizForm((state) => state.setNewQuizData);

  const currentUser = useAuthStore((state) => state.currentUser);

  const methods = useForm({
    mode: "onChange",
    defaultValues: quizData,
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: QuizFormState): Promise<void> => {
    try {
      if (currentUser) {
        await addQuiz(data, currentUser?.id, currentUser?.name);
        setQuizFormData(data);
        reset();
      }
    } catch (error) {
      setError("root", {
        message: "Failed to create a quiz",
      });
    }
  };

  const errorTitle = errors.title?.message;
  const errorDescription = errors.description?.message;

  return (
    <Container>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-3" controlId="div-title">
            <Form.Label>Quiz Title</Form.Label>
            <Form.Control
              {...register("title", {
                required: "Title is required",
                minLength: 8,
              })}
              type="text"
              placeholder="Best Quiz ever..."
            />
            {(errorTitle as string)
              ? addClassnameToText("text-danger", errorTitle as string)
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <Form.Group className="mb-3" controlId="div-description">
            <Form.Label>Quiz Description</Form.Label>
            <Form.Control
              {...register("description", {
                required: "Description is required",
                minLength: 8,
              })}
              as="textarea"
              rows={3}
            />
            {(errorDescription as string)
              ? addClassnameToText("text-danger", errorDescription as string)
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <FormRangeComponent fieldName="complexity" />
          <FormCategoryComponent fieldName="category" />
          <h5 className="mx-auto mb-3 mt-3 text-center">Add your questions</h5>
          <QuestionsFormComponent />
          <div className="d-flex justify-content-center">
            <Button className="me-3" variant="secondary" onClick={handleClose}>
              Close Quiz
            </Button>
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save Quiz"}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </Container>
  );
};

export default QuizFormComponent;
