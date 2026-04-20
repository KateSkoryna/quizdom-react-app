import * as yup from "yup";
import { QuizCategory, Complexity } from "../types";

// Answer validation schema
export const answerSchema = yup.object().shape({
  answer: yup
    .string()
    .required("Answer text is required")
    .trim()
    .min(1, "Answer text cannot be empty"),
  isCorrect: yup.boolean().required("isCorrect field is required"),
});

// Question validation schema
export const questionSchema = yup.object().shape({
  questionTitle: yup
    .string()
    .required("Question title is required")
    .trim()
    .min(4, "Question title must be at least 4 characters long")
    .max(200, "Question title must be at most 200 characters long"),
  answers: yup
    .array()
    .of(answerSchema)
    .min(2, "Each question must have at least 2 answers")
    .max(6, "Each question must have at most 6 answers")
    .required("Answers are required")
    .test(
      "has-correct-answer",
      "Each question must have at least one correct answer",
      (answers) => {
        if (!answers) return false;
        return answers.some((answer) => answer.isCorrect === true);
      }
    ),
  hint: yup
    .string()
    .trim()
    .required("Hint is required")
    .max(30, "Hint must be at most 30 characters long"),
});

// Quiz validation schema
export const quizSchema = yup.object().shape({
  title: yup
    .string()
    .required("Quiz title is required")
    .trim()
    .min(3, "Quiz title must be at least 3 characters long")
    .max(100, "Quiz title must be at most 100 characters long"),
  description: yup
    .string()
    .required("Quiz description is required")
    .trim()
    .min(10, "Quiz description must be at least 10 characters long")
    .max(160, "Quiz description must be at most 160 characters long"),
  complexity: yup
    .mixed<Complexity>()
    .oneOf(Object.values(Complexity), "Invalid complexity level")
    .required("Complexity is required"),
  category: yup
    .mixed<QuizCategory>()
    .oneOf(Object.values(QuizCategory), "Invalid category")
    .required("Category is required"),
  questions: yup
    .array()
    .of(questionSchema)
    .min(6, "Quiz must contain at least 6 questions")
    .max(25, "Quiz must contain at most 25 questions")
    .required("Questions are required"),
});

export type QuizSchemaType = yup.InferType<typeof quizSchema>;
