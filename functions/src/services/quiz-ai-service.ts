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
    const angles = [
      "focus on obscure edge cases",
      "focus on real-world practical scenarios",
      "focus on historical context and origins",
      "focus on common misconceptions",
      "focus on high-performance optimization",
    ];
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    const prompt = `
You are an expert quiz author.

Generate a quiz that STRICTLY follows ALL rules below.

CRITICAL RULES - NUMBER OF QUESTIONS:
- Default: Generate exactly 10 questions
- If the user's custom prompt specifies a different number of questions (e.g., "create 15 questions", "make 8 questions", "generate 20 questions"), use that number instead
- IMPORTANT: You can generate between 6 and 25 questions total (minimum 6, maximum 25)
- If user requests less than 6, generate 6 questions (the minimum)
- If user requests more than 25, generate 25 questions (the maximum)

CRITICAL RULES - QUESTION TYPES:
- Each question can have either 2 options (True/False style) or 4 options (multiple-choice)
- User has FULL FREEDOM - quiz can have all True/False, all multiple-choice, or any mix
- If user's prompt specifies question type (e.g., "all True/False questions", "only multiple choice"), follow that preference
- Exactly ONE correct answer per question
- The "correct_answer" must EXACTLY match one option from the "options" array
- Language: ${language}
- DIVERSITY ANGLE: ${randomAngle}

HINT REQUIREMENTS (CRITICAL - VALIDATION WILL FAIL IF NOT FOLLOWED):
- Every question MUST have a hint
- Title MUST be 100 characters or less (including spaces and punctuation)
- Description MUST be 160 characters or less (including spaces and punctuation)
- Hint MUST be 30 characters or less (including spaces and punctuation)
- Hint should be a brief clue, not a full sentence
- Examples of valid hints: "Think about data types", "Check syntax rules", "Common array method"
- Question title MUST be 160 characters long or less (including spaces and punctuation)

CONTENT GUIDELINES:
- No obvious clues or repeated words between questions and answers
- Use paraphrasing and synonyms
- Title: max 70 characters
- Description: max 160 characters

CATEGORY: "${category}"
COMPLEXITY LEVEL: "${complexity}"
${customUserPrompt ? `ADDITIONAL INSTRUCTIONS: "${customUserPrompt}"` : ""}
`;

    const { output } = await ai.generate({
      prompt,
      config: {
        temperature: 1.2, // Range: 0.0 - 2.0. Higher is more creative/random.
      },
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
