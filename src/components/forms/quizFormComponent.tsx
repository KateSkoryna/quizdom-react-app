import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { QuizFormState, Complexity, QuizCategory, UserQuiz } from "../../types";
import { Container, Button } from "react-bootstrap";
import FormDropdownComponent from "./formDropdownComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import styles from "../../styles/components/modal.module.scss";
import { useAuthStore, type AuthStore } from "../../store/authStore";
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSchema } from "../../schemas";
import addClassnameToText from "../../utils/addClassnameToText";
import type { Status } from "../modal/quizModal";
import { useQuizStore } from "../../store/quizStore";
import { useGeneratedQuizStore } from "../../store/generatedQuizStore";

// Use type instead of interface
type QuizFormProps = {
  handleClose: () => void;
  onFormStateChange?: (state: { isDirty: boolean; isSubmitting: boolean }) => void;
  existingQuiz?: UserQuiz;
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

// ForwardRef type
type QuizFormRef = {
  submit: (status: Status) => void;
  isSubmitting: boolean;
  isDirty: boolean;
};

const QuizFormComponent = forwardRef<QuizFormRef, QuizFormProps>(
  ({ handleClose, onFormStateChange, existingQuiz }, ref) => {
    const currentUser = useAuthStore((state: AuthStore) => state.currentUser);
    const addQuiz = useQuizStore((store) => store.addQuiz);
    const updateQuiz = useQuizStore((store) => store.updateQuiz);
    const {
      generatedQuiz,
      isGenerating,
      error: generateError,
      remainingAttempts,
      generateQuiz,
      clearGeneratedQuiz,
    } = useGeneratedQuizStore();
    const [userPrompt, setUserPrompt] = useState("");

    const initialValues = existingQuiz
      ? {
          title: existingQuiz.title,
          description: existingQuiz.description,
          complexity: existingQuiz.complexity,
          category: existingQuiz.category,
          questions: existingQuiz.questions,
        }
      : defaultValues;

    const methods = useForm({
      mode: "onChange",
      defaultValues: initialValues,
      resolver: yupResolver(quizSchema),
    });

    const {
      register,
      handleSubmit,
      setError,
      reset,
      watch,
      setValue,
      formState: { errors, isDirty, isSubmitting },
    } = methods;

    // Watch category and complexity for AI generation
    const category = watch("category");
    const complexity = watch("complexity");

    // Imperative handle with status
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

    // Fill form when quiz is generated
    useEffect(() => {
      if (generatedQuiz) {
        // 1. Set top-level fields
        setValue("title", generatedQuiz.title, { shouldDirty: true });
        setValue("description", generatedQuiz.description, { shouldDirty: true });

        // 2. Simply use setValue for the array.
        // React Hook Form will pass this down to the useFieldArray in the child.
        setValue("questions", generatedQuiz.questions, {
          shouldDirty: true,
          shouldValidate: true,
        });

        clearGeneratedQuiz();
      }
    }, [generatedQuiz, setValue, clearGeneratedQuiz]);

    const handleGenerateQuiz = async () => {
      await generateQuiz({
        category,
        complexity,
        language: "English",
        customUserPrompt: userPrompt,
      });
    };

    const handleFormSubmit = async ({ status, ...data }: QuizFormState & { status: Status }) => {
      if (currentUser) {
        if (existingQuiz?.id) {
          // Update existing quiz
          await updateQuiz(existingQuiz.id, { ...data, status });
        } else {
          // Create new quiz
          await addQuiz({ ...data, status }, setError);
        }

        reset();
        handleClose();
      } else {
        console.error("No current user found!");
      }
    };

    const errorTitle = errors.title?.message;
    const errorDescription = errors.description?.message;
    const errorRoot = errors.root?.message;

    return (
      <Container className={styles.formContainer}>
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

            {!existingQuiz && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Form.Group style={{ flex: 1 }} controlId="div-userPrompt">
                    <Form.Label className={styles.formLabel}>AI Prompt (optional)</Form.Label>
                    <Form.Control
                      className={styles.formTextarea}
                      as="textarea"
                      maxLength={250}
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Describe what you want the AI to generate..."
                    />
                    <Form.Text className={styles.smallText}>
                      {userPrompt.length}/250 characters
                    </Form.Text>
                  </Form.Group>

                  <Button
                    type="button"
                    className={[styles.generateAIBtn, isGenerating && styles.loading]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={handleGenerateQuiz}
                    disabled={isGenerating || remainingAttempts <= 0}
                    style={{ backgroundColor: "transparent" }}
                  />
                </div>

                {generateError && (
                  <div style={{ color: "red", marginTop: "0.5rem" }}>{generateError}</div>
                )}

                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                  {remainingAttempts <= 0 && (
                    <div style={{ color: "orange", marginTop: "0.5rem" }}>
                      Maximum generation attempts reached. Please reload to try again.
                    </div>
                  )}
                </div>
              </>
            )}
            <Form.Group className={styles.formGroup} controlId="div-title">
              <Form.Label className={styles.formLabel}>Quiz Title</Form.Label>
              <Form.Control
                className={styles.formInput}
                {...register("title")}
                type="text"
                placeholder="Best Quiz ever..."
              />
              {errorTitle && addClassnameToText("text-danger", errorTitle as string)}
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="div-description">
              <Form.Label className={styles.formLabel}>Quiz Description</Form.Label>
              <Form.Control
                className={styles.formTextarea}
                {...register("description")}
                placeholder="Add your custom description..."
                as="textarea"
                rows={3}
              />
              {errorDescription && addClassnameToText("text-danger", errorDescription as string)}
            </Form.Group>

            <div className={styles.dropdownRow}>
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
