import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { QuizFormState, Complexity, QuizCategory } from "../../types";
import { Container } from "react-bootstrap";
import FormDropdownComponent from "./formDropdownComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import modalStyles from "../../styles/components/modal.module.scss";
import { useAuthStore } from "../../store/AuthStore";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSchema } from "../../schemas";
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
      console.log("📋 Form submitted with data:", data);
      console.log("👤 Current user:", currentUser);

      if (currentUser) {
        debugger;
        try {
          console.log("🔄 Calling addQuiz...");
          await addQuiz(data, currentUser.id, currentUser.name, setError);
          console.log("✅ Quiz created successfully!");
          reset();
          handleClose();
        } catch (error) {
          console.error("❌ Error in handleFormSubmit:", error);
          // Error is already set by addQuiz, just log it
        }
      } else {
        console.error("❌ No current user found!");
      }
    };

    const errorTitle = errors.title?.message;
    const errorDescription = errors.description?.message;
    const errorRoot = errors.root?.message;

    return (
      <Container className={modalStyles.formContainer}>
        <FormProvider {...methods}>
          <Form
            onSubmit={handleSubmit((data: QuizFormState) =>
              handleFormSubmit({ ...data, status: "done" })
            )}
          >
            {errorRoot && (
              <div className="alert alert-danger" role="alert">
                {errorRoot}
              </div>
            )}
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
