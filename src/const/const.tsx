import { NewsCategory, Complexity, QuizCategory } from "../types/types";

export const DEFAULT_IMG: string =
  "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2024/05/ipad-apple-event-logo.jpg";

export const NEWS_CATEGORY = {
  [NewsCategory.TECHNOLOGY]: "technology",
  [NewsCategory.HEALTH]: "health",
  [NewsCategory.BUSINESS]: "business",
  [NewsCategory.SCIENCE]: "science",
};

export const COMPLEXITY_VALUES = {
  "1": Complexity.BEGINNER,
  "2": Complexity.MEDIUM,
  "3": Complexity.ADVANCED,
  "4": Complexity.EXPERT,
};

export const QUIZ_CATEGORY = {
  [QuizCategory.JS]: "JavaScript",
  [QuizCategory.TS]: "TypeScript",
  [QuizCategory.REACT]: "React",
  [QuizCategory.NEXT_JS]: "NextJS",
  [QuizCategory.NODE_JS]: "NodeJS",
  [QuizCategory.JEST]: "Jest",
};
