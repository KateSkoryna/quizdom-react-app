import { Complexity, QuizCategory } from "../../shared/types";

// Constants
export const COMPLEXITY_VALUES = {
  [Complexity.BEGINNER]: "beginner",
  [Complexity.MEDIUM]: "medium",
  [Complexity.ADVANCED]: "advanced",
  [Complexity.EXPERT]: "expert",
};

export const QUIZ_CATEGORY = {
  [QuizCategory.JS]: "JavaScript",
  [QuizCategory.TS]: "TypeScript",
  [QuizCategory.REACT]: "ReactJS",
  [QuizCategory.NEXT_JS]: "NextJS",
  [QuizCategory.NODE_JS]: "NodeJS",
  [QuizCategory.JEST]: "Jest",
  [QuizCategory.OTHER]: "Other",
};

export const convertComplexity = (complexity: string) => {
  switch (complexity) {
    case "1":
      return COMPLEXITY_VALUES[Complexity.BEGINNER];
    case "2":
      return COMPLEXITY_VALUES[Complexity.MEDIUM];
    case "3":
      return COMPLEXITY_VALUES[Complexity.ADVANCED];
    case "4":
      return COMPLEXITY_VALUES[Complexity.EXPERT];
    default:
      return COMPLEXITY_VALUES[Complexity.BEGINNER];
  }
};
