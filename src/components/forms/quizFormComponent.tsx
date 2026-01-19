import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { QuizFormState, Complexity, QuizCategory, UserQuiz } from "../../types";
import { Container } from "react-bootstrap";
import FormDropdownComponent from "./formDropdownComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import AIPromptInput from "./AIPromptInput";
import styles from "../../styles/components/modal.module.scss";
import { useAuthStore, type AuthStore } from "../../store/authStore";
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSchema } from "../../schemas";
import addClassnameToText from "../../utils/addClassnameToText";
import type { Status } from "../modal/quizModal";
import { useGeneratedQuizStore } from "../../store/generatedQuizStore";
import { useAddQuiz, useUpdateQuiz } from "../../hooks/useQuizzes";
import { getConfigByFieldName } from "../../const/complexity";

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
    const { mutateAsync: addQuiz } = useAddQuiz();
    const { mutateAsync: updateQuiz } = useUpdateQuiz();
    const {
      generatedQuiz,
      isGenerating,
      error: generateError,
      remainingAttempts,
      generateQuiz,
      clearGeneratedQuiz,
    } = useGeneratedQuizStore();
    const [userPrompt, setUserPrompt] = useState("");

    // Get dropdown configs
    const complexityConfig = getConfigByFieldName("complexity");
    const categoryConfig = getConfigByFieldName("category");

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

    useEffect(() => {
      if (generatedQuiz) {
        setValue("title", generatedQuiz.title, { shouldDirty: true });
        setValue("description", generatedQuiz.description, { shouldDirty: true });

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
          await updateQuiz({ quizId: existingQuiz.id, data: { ...data, status } });
        } else {
          await addQuiz({ ...data, status });
        }
        reset();
        handleClose();
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
              <AIPromptInput
                value={userPrompt}
                onChange={setUserPrompt}
                onGenerate={handleGenerateQuiz}
                isGenerating={isGenerating}
                isDisabled={isGenerating || remainingAttempts <= 0}
                error={generateError}
                remainingAttempts={remainingAttempts}
              />
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
              <FormDropdownComponent
                name="complexity"
                label={complexityConfig.label}
                options={complexityConfig.options}
                formatDisplayValue={complexityConfig.formatDisplayValue}
              />
              <FormDropdownComponent
                name="category"
                label={categoryConfig.label}
                options={categoryConfig.options}
                formatDisplayValue={categoryConfig.formatDisplayValue}
              />
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
