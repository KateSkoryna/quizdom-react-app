import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { QuizFormState, Complexity, QuizCategory, UserQuiz } from "../../types";
import FormDropdownComponent from "./formDropdownComponent";
import QuestionsFormComponent from "./questionsFormComponent";
import AIPromptInput from "./AIPromptInput";
import styles from "../../styles/components/quizForm.module.scss";
import { MdTune } from "react-icons/md";
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
    const [promptError, setPromptError] = useState<string | null>(null);

    const handlePromptChange = (value: string) => {
      setUserPrompt(value);
      const match = value.match(/\b(\d+)\s*questions?\b/i);
      if (match) {
        const count = parseInt(match[1], 10);
        if (count < 6) {
          setPromptError(
            `${count} question${count === 1 ? "" : "s"} is too few — the minimum is 6.`
          );
        } else if (count > 25) {
          setPromptError(`${count} questions is too many — the maximum is 25.`);
        } else {
          setPromptError(null);
        }
      } else {
        setPromptError(null);
      }
    };

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
      setError,
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
        try {
          if (existingQuiz?.id) {
            await updateQuiz({ quizId: existingQuiz.id, data: { ...data, status } });
          } else {
            await addQuiz({ ...data, status });
          }
        } catch (error) {
          setError("root", {
            message: error instanceof Error ? error.message : "Failed to save quiz",
          });
          return;
        }
        reset();
        handleClose();
      }
    };

    const errorTitle = errors.title?.message;
    const errorDescription = errors.description?.message;
    const errorRoot = errors.root?.message;

    return (
      <FormProvider {...methods}>
        <Form
          className={styles.form}
          noValidate
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
              onChange={handlePromptChange}
              onGenerate={handleGenerateQuiz}
              isGenerating={isGenerating}
              isDisabled={isGenerating || remainingAttempts <= 0 || !!promptError}
              error={promptError ?? generateError}
              remainingAttempts={remainingAttempts}
            />
          )}
          <section className={styles.section} aria-labelledby="quiz-details-title">
            <h3 id="quiz-details-title" className={styles.sectionTitle}>
              <MdTune aria-hidden="true" />
              Quiz details
            </h3>
            <Form.Group className={styles.field} controlId="div-title">
              <Form.Label className={styles.label}>Title</Form.Label>
              <Form.Control
                className={styles.input}
                {...register("title")}
                type="text"
                placeholder="e.g. JavaScript Closures & Scope"
              />
              {errorTitle && addClassnameToText("text-danger", errorTitle as string)}
            </Form.Group>

            <Form.Group className={styles.field} controlId="div-description">
              <Form.Label className={styles.label}>Description</Form.Label>
              <Form.Control
                className={styles.textarea}
                {...register("description")}
                placeholder="What will people learn or practise?"
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
          </section>

          <QuestionsFormComponent />
        </Form>
      </FormProvider>
    );
  }
);

QuizFormComponent.displayName = "QuizFormComponent";

export default QuizFormComponent;
