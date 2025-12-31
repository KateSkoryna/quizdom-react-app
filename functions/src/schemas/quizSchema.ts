import { z } from "genkit";

/* ======================================================
   Frontend / Internal domain schemas
   (MATCH your existing TS interfaces exactly)
   ====================================================== */

// --- Answer ---
export const answerSchema = z.object({
  answer: z
    .string()
    .min(1, "Answer cannot be empty")
    .max(100, "Answer cannot exceed 100 characters"),
  isCorrect: z.boolean(),
});

// --- Question ---
export const questionSchema = z.object({
  questionTitle: z
    .string()
    .min(4, "Question title must be at least 4 characters long")
    .max(200, "Question title must be at most 200 characters long")
    .trim(),

  answers: z
    .array(answerSchema)
    .refine(
      (answers) => answers.length === 2 || answers.length === 4,
      "Each question must have exactly 2 or 4 answers"
    )
    .refine(
      (answers) => answers.some((a) => a.isCorrect),
      "Each question must have at least one correct answer"
    ),

  hint: z.string().max(50).optional(),
});

// --- Quiz ---
export const quizSchema = z.object({
  title: z
    .string()
    .min(3, "Quiz title must be at least 3 characters long")
    .max(100, "Quiz title must be at most 100 characters long")
    .trim(),

  description: z
    .string()
    .min(10, "Quiz description must be at least 10 characters long")
    .max(200, "Quiz description must be at most 200 characters long")
    .trim(),
  status: z.string(),
  complexity: z.enum(["Beginner", "Medium", "Advanced", "Expert"]),
  category: z.enum(["JavaScript", "TypeScript", "ReactJS", "NextJS", "NodeJS", "Jest", "Other"]),
  questions: z
    .array(questionSchema)
    .min(6, "Quiz must contain at least 6 questions")
    .max(25, "Quiz must contain at most 25 questions"),
});

export type QuizSchemaType = z.infer<typeof quizSchema>;

/* ======================================================
   Flow input schema (API / Genkit)
   ====================================================== */

// Replace Object.values with a literal array if possible
export const quizInputSchema = z.object({
  category: z.enum(["JavaScript", "TypeScript", "ReactJS", "NextJS", "NodeJS", "Jest", "Other"]),
  complexity: z.enum(["Beginner", "Medium", "Advanced", "Expert"]), // Adjust to your enum values
  language: z.string().default("English"),
  customUserPrompt: z.string().max(300).optional(),
});

/* ======================================================
   AI output schema (RAW model JSON)
   This is what the LLM MUST return
   ====================================================== */

export const flowQuestionSchema = z.object({
  type: z.enum(["multiple-choice", "true-false"]),

  question_text: z.string().min(4).max(200),

  // Options required for all questions (true-false: 2 options, multiple-choice: 4 options)
  options: z
    .array(z.string().min(1).max(100))
    .min(2)
    .max(4)
    .refine(
      (opts) => opts.length === 2 || opts.length === 4,
      "Must have exactly 2 (true-false) or 4 (multiple-choice) options"
    ),

  correct_answer: z.string().min(1).max(100),

  hint: z.string().max(40),
});

export const quizOutputSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(200),
  questions: z.array(flowQuestionSchema).min(6).max(25),
});
