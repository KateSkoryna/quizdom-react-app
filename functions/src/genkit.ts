import { generateQuizFlow } from "./services/quiz-ai-service";
import { QuizCategory, Complexity } from "./types/quiz";

async function main() {
  // Use the flow directly. Genkit flows are callable like functions.
  // The input object must match your quizInputSchema exactly.
  try {
    const _quiz = await generateQuizFlow({
      category: QuizCategory.REACT,
      complexity: Complexity.MEDIUM,
      language: "English",
      customUserPrompt: "Make it fun for kids",
    });
  } catch (error) {
    console.error("Flow execution failed:", error);
  }
}

main();
