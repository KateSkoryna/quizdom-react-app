import "dotenv/config";
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { retry } from "genkit/model/middleware";

import { quizInputSchema, quizOutputSchema } from "../schemas/quizSchema";

// --- Genkit AI instance ---
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  model: googleAI.model("gemini-2.5-flash"),
});

// --- Quiz generation flow (AI JSON ONLY) ---
export const generateQuizFlow = ai.defineFlow(
  {
    name: "generateQuiz",
    inputSchema: quizInputSchema,
  },
  async ({ category, complexity, language, customUserPrompt }) => {
    const prompt = `
You are an expert quiz author.

Generate a quiz that STRICTLY follows ALL rules below.

CRITICAL RULES:
- Exactly 10 questions total
- Exactly 2 True/False questions (must include "options": ["True", "False"])
- Exactly 8 multiple-choice questions (4 options each)
- Exactly ONE correct answer per question
- The "correct_answer" must EXACTLY match one option from the "options" array
- Language: ${language}

HINT REQUIREMENTS (CRITICAL - VALIDATION WILL FAIL IF NOT FOLLOWED):
- Every question MUST have a hint
- Hint MUST be 40 characters or less (including spaces and punctuation)
- Hint should be a brief clue, not a full sentence
- Examples of valid hints: "Think about data types", "Check syntax rules", "Common array method"

CONTENT GUIDELINES:
- No obvious clues or repeated words between questions and answers
- Use paraphrasing and synonyms
- Title: max 100 characters
- Description: max 200 characters

CATEGORY: "${category}"
COMPLEXITY LEVEL: "${complexity}"
${customUserPrompt ? `ADDITIONAL INSTRUCTIONS: "${customUserPrompt}"` : ""}
`;

    const { output } = await ai.generate({
      prompt,
      output: {
        schema: quizOutputSchema,
      },
      use: [
        retry({
          maxRetries: 2,
          initialDelayMs: 1000,
          backoffFactor: 2,
        }),
      ],
    });

    if (!output) {
      throw new Error("AI failed to generate quiz");
    }

    // Transform AI output to match frontend QuizFormState format
    const transformedQuiz = {
      title: output.title,
      description: output.description,
      questions: output.questions.map((q) => ({
        questionTitle: q.question_text,
        hint: q.hint,
        answers: q.options.map((option) => ({
          answer: option,
          isCorrect: option === q.correct_answer,
        })),
      })),
    };

    return transformedQuiz;
  }
);
