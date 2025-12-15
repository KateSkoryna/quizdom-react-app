import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { QuizFormState, Complexity, QuizCategory } from "../../../shared/src/types";
import { Container } from "react-bootstrap";
import FormDropdownComponent from "./formDropdownComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import modalStyles from "../../styles/components/modal.module.scss";
import { useAuthStore } from "../../store/AuthStore";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSchema } from "@quizdom-app/shared/src";
import addClassnameToText from "../../utils/addClassnameToText";
import type { Status } from "../modal/quizModal";
import { useQuizesStore } from "../../store/quizeStore";

// ✅ Use type instead of interface
type QuizFormProps = {
  handleClose: () => void;
  onFormStateChange?: (state: { isDirty: boolean; isSubmitting: boolean }) => void;
};

const defaultValues: Omit<QuizFormState, "status"> = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      questionTitle: "",
      hint: "",
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
      ],
    },
  ],
};

// ✅ ForwardRef type
type QuizFormRef = {
  submit: (status: Status) => void;
  isSubmitting: boolean;
  isDirty: boolean;
};

const QuizFormComponent = forwardRef<QuizFormRef, QuizFormProps>(
  ({ handleClose, onFormStateChange }, ref) => {
    const currentUser = useAuthStore((state) => state.currentUser);
    const addQuiz = useQuizesStore((store) => store.addQuiz);

    const methods = useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(quizSchema),
    });

    const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors, isDirty, isSubmitting },
    } = methods;

    // ✅ Imperative handle with status
    useImperativeHandle(ref, () => ({
      submit: (status: Status) => {
        handleSubmit((data: QuizFormState) => handleFormSubmit({ ...data, status }))();
      },
      isSubmitting,
      isDirty,
    }));

    useEffect(() => {
      onFormStateChange?.({ isDirty, isSubmitting });
    }, [isDirty, isSubmitting, onFormStateChange]);

    const handleFormSubmit = async (data: QuizFormState & { status: Status }) => {
      if (currentUser) {
        await addQuiz(data, currentUser.id, currentUser.name, setError);
        reset();
        handleClose();
      }
    };

    const errorTitle = errors.title?.message;
    const errorDescription = errors.description?.message;

    return (
      <Container className={modalStyles.formContainer}>
        <FormProvider {...methods}>
          <Form
            onSubmit={handleSubmit((data: QuizFormState) =>
              handleFormSubmit({ ...data, status: "done" })
            )}
          >
            <Form.Group className={modalStyles.formGroup} controlId="div-title">
              <Form.Label className={modalStyles.formLabel}>Quiz Title</Form.Label>
              <Form.Control
                className={modalStyles.formInput}
                {...register("title")}
                type="text"
                placeholder="Best Quiz ever..."
              />
              {errorTitle && addClassnameToText("text-danger", errorTitle as string)}
            </Form.Group>

            <Form.Group className={modalStyles.formGroup} controlId="div-description">
              <Form.Label className={modalStyles.formLabel}>Quiz Description</Form.Label>
              <Form.Control
                className={modalStyles.formTextarea}
                {...register("description")}
                as="textarea"
                rows={3}
              />
              {errorDescription && addClassnameToText("text-danger", errorDescription as string)}
            </Form.Group>

            <div className={modalStyles.dropdownRow}>
              <FormDropdownComponent fieldName="complexity" />
              <FormDropdownComponent fieldName="category" />
            </div>

            <QuestionsFormComponent />
          </Form>
        </FormProvider>
      </Container>
    );
  }
);

QuizFormComponent.displayName = "QuizFormComponent";

export default QuizFormComponent;
