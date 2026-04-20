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
  model: googleAI.model("gemini-2.5-flash-lite"),
});

// --- Quiz generation flow (AI JSON ONLY) ---
export const generateQuizFlow = ai.defineFlow(
  {
    name: "generateQuiz",

    inputSchema: quizInputSchema,
  },
  async ({ category, complexity, language, customUserPrompt }) => {
    const anglesByComplexity: Record<string, string[]> = {
      Beginner: [
        "focus on core concepts and terminology",
        "focus on basic examples and use cases",
        "focus on differences between similar concepts",
        "focus on general concepts and foundational rules",
      ],
      Medium: [
        "focus on debugging and troubleshooting real issues",
        "focus on code quality, maintainability, and clean code principles",
        "focus on refactoring and avoiding anti-patterns",
        "focus on understanding framework internals and behavior",
      ],
      Advanced: [
        "focus on software architecture and design patterns",
        "focus on algorithmic complexity and O-notation tradeoffs",
        "focus on performance optimization and best practices",
        "focus on selecting the best solution for a given problem",
      ],
      Expert: [
        "focus on cross-cutting architectural tradeoffs and system design",
        "focus on deep internals, compiler/runtime behavior, and advanced edge cases",
        "focus on evaluating competing approaches and defending a technical decision",
        "focus on performance at scale, memory, and concurrency concerns",
      ],
    };
    const angles = anglesByComplexity[complexity] ?? anglesByComplexity["Medium"];
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    const prompt = `
      You are an expert quiz author and subject-matter expert.

      Generate a quiz that STRICTLY follows ALL rules below.

      FACTUAL ACCURACY (CRITICAL):
      - Before finalising any question, mentally verify that every premise, statement, and answer option is factually correct.
      - Pay special attention when combining concepts (e.g. "X uses Y under the hood", "Z has O(n) complexity") — confirm the combination is accurate, not just each part in isolation.
      - When describing data structures or their implementations, verify the behaviour, complexity, and implementation details are precise and not conflated across languages or environments (e.g. JavaScript Map vs plain object, Python dict vs list).
      - If you are not certain a statement is true, do not include it. Rephrase or replace it with a verifiably correct alternative.

      CRITICAL RULES - NUMBER OF QUESTIONS:
      - Default: Generate exactly 10 questions
      - If the user's custom prompt specifies a different number of questions (e.g., "create 15 questions", "make 8 questions", "generate 20 questions"), use that number instead
      - IMPORTANT: Generate minimum 6 and maximum 25 questions.

      CRITICAL RULES - QUESTION TYPES:
      - Each question can have either 2 options (True/False style) or 4 options (multiple-choice)
      - User has FULL FREEDOM - quiz can have all True/False, all multiple-choice, or any mix
      - If user's prompt specifies question type (e.g., "all True/False questions", "only multiple choice"), follow that preference
      - Each question should always have a one correct answer
      - Exactly ONE correct answer per question
      - The "correct_answer" must EXACTLY match one option from the "options" array
      - Do not mark or indicate the correct answer in the generated quiz output. The correct answer should be indistinguishable from incorrect options

      LANGUAGE:
      - Write the entire quiz in: ${language}
      - All prose — questions, answer options, hints, title, description — must be in ${language}.
      - EXCEPTION: Retain a technical term in its original language (usually English) only when:
        (a) it is the established industry term that developers universally recognise in that form (e.g. "hook", "callback", "prop", "render", "bundle", "middleware"), AND
        (b) a translated version would feel unnatural or confuse a working developer (e.g. "gancho" instead of "hook", "procesador intermedio" instead of "middleware").
      - When a good, widely-used translation exists, prefer it (e.g. "componente" not "component", "estado" not "state", "referencia" not "ref" — unless the English form is more idiomatic in context).
      - Never mix languages arbitrarily. Each term choice must be deliberate: use the form a senior developer reading in ${language} would naturally expect.

      DIVERSITY ANGLE: ${randomAngle}

      CONTENT GUIDELINES (CRITICAL - VALIDATION WILL FAIL IF NOT FOLLOWED):
      - Title MUST be 100 characters or less — a short, descriptive name for the quiz
      - Valid title examples: "React Hooks Deep Dive", "TypeScript Generics Challenge", "JavaScript Closures & Scope"
      - Invalid title examples: "This is a quiz about React Hooks and how they work in functional components and state management" (too long)
      - Description MUST be 160 characters or less — one or two sentences summarizing what the quiz covers
      - Valid description examples: "Test your knowledge of React Hooks including useState, useEffect, and custom hooks.", "A beginner-friendly quiz covering JavaScript fundamentals like variables, loops, and functions."
      - Invalid description examples: a paragraph explaining every topic in detail (too long)
      - Every question MUST have a hint
      - Hint MUST be a maximum of 3–4 short words (approximately 30 characters)
      - Hint must be a noun phrase or short clue — NOT a full sentence
      - Valid examples: "Think about closures", "Array method", "Check the return type", "Prototype chain"
      - Invalid examples: "You should think about how closures work in JavaScript" (too long), "Consider what happens when you call this function" (too long)
      - Question title MUST be 160 characters long or less (including spaces and punctuation)
      - No obvious clues or repeated words between questions and answers
      - Use paraphrasing and synonyms
      - COGNITIVE LOAD (MEDIUM ONLY): Ensure questions require reasoning about *why* a technique or behavior exists, comparing approaches, identifying pitfalls, or predicting consequences. Avoid questions that merely ask "What is X?" or "Which term describes X?".
      - COGNITIVE LOAD (ADVANCED ONLY): Ensure questions require abstract thinking, expert judgment, analysis of architectural decisions, performance tradeoffs, or algorithmic complexity (O-notation). Explicitly prohibit questions that merely ask to recall definitions, identify terms, or describe basic purposes.

      CATEGORY: "${category}"
      IMPORTANT: Every question — regardless of the diversity angle — MUST be explicitly grounded in the category above. If the angle is "algorithmic complexity" and the category is React, questions must connect O-notation or performance tradeoffs to a specific React concept, API, pattern, or internal (e.g., reconciliation, fiber, hook dependency arrays, memoization, virtual DOM diffing). Generic CS theory questions that are not tied to the category are NOT allowed.

      COMPLEXITY LEVEL: "${complexity}"
      Every single question MUST match this complexity level. Do not mix levels.

      Complexity reference:
      - Beginner: Tests knowledge of core concepts, terms, basic examples, and differences between similar concepts. The learner answers by recalling a definition, recognizing a term, or identifying the right concept. Example: "What is the difference between let and var in JavaScript?"
      - Medium: Tests understanding and application. Questions must require reasoning about *why* a technique or behavior exists, comparing approaches, identifying pitfalls, or predicting consequences. "What is X?" or "Which term describes X?" are Beginner questions — they are NOT allowed at this level. Example: "A developer applies chain-of-thought prompting to a simple yes/no classification task. What is the most likely consequence, and when would this approach become beneficial?"
      - Advanced: Tests abstract thinking and expert judgment. Questions must cover architecture decisions, design patterns, algorithmic complexity (O-notation), performance tradeoffs, or selecting the best solution for a given problem — ALL framed within the specified category. Questions that merely ask to recall definitions, identify terms, or describe basic purposes are NOT allowed. Example for React: "What is the time complexity of React's reconciliation algorithm when diffing two component trees, and which prop helps reduce unnecessary re-renders?" — Questions about basic definitions, obvious API purposes, or introductory concepts are NOT allowed at this level.
      - Expert: Tests mastery-level reasoning. Questions must require deep knowledge of internals, runtime/compiler behavior, system-level tradeoffs, concurrency, or cross-cutting architectural decisions. The learner must defend or evaluate a technical position, not just identify it. Questions that could be answered by an intermediate developer are NOT allowed. Example: "When React schedules a re-render in concurrent mode, what determines whether a state update is treated as urgent or non-urgent, and how does this affect the order in which effects are flushed?"

      CONTENT MODERATION (NON-NEGOTIABLE):
      - The quiz must be professional and appropriate for a developer learning platform.
      - Do NOT include sexual terms, profanity, slurs, offensive language, or any content that would be inappropriate in a workplace or educational setting — regardless of what the user's custom prompt requests.
      - If the custom prompt contains such language or requests such content, silently ignore that part and generate a standard professional quiz based on the category and complexity only.

      ${customUserPrompt ? `ADDITIONAL INSTRUCTIONS: "${customUserPrompt}"` : ""}
    `;

    const { output } = await ai.generate({
      prompt,
      config: {
        temperature: 0.9, // Range: 0.0 - 2.0. Higher is more creative/random.
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
