import { Complexity, QuizCategory } from "../types";

// Constants
export const COMPLEXITY_VALUES = {
  [Complexity.BEGINNER]: "Beginner",
  [Complexity.MEDIUM]: "Medium",
  [Complexity.ADVANCED]: "Advanced",
  [Complexity.EXPERT]: "Expert",
};

export const QUIZ_CATEGORY = {
  [QuizCategory.JS]: "JavaScript",
  [QuizCategory.TS]: "TypeScript",
  [QuizCategory.REACT]: "ReactJS",
  [QuizCategory.NEXT_JS]: "NextJS",
  [QuizCategory.NODE_JS]: "NodeJS",
  [QuizCategory.JEST]: "Jest",
  [QuizCategory.WEB_FUNDAMENTALS]: "Web Fundamentals",
  [QuizCategory.HTTP_REST]: "HTTP & REST APIs",
  [QuizCategory.WEB_PERFORMANCE]: "Web Performance",
  [QuizCategory.WEB_ACCESSIBILITY]: "Web Accessibility",
  [QuizCategory.OTHER]: "Other",
};

export const convertComplexity = (complexity: string) => {
  switch (complexity) {
    case "Beginner":
    case "1":
      return COMPLEXITY_VALUES[Complexity.BEGINNER];
    case "Medium":
    case "2":
      return COMPLEXITY_VALUES[Complexity.MEDIUM];
    case "Advanced":
    case "3":
      return COMPLEXITY_VALUES[Complexity.ADVANCED];
    case "Expert":
    case "4":
      return COMPLEXITY_VALUES[Complexity.EXPERT];
    default:
      return COMPLEXITY_VALUES[Complexity.BEGINNER];
  }
};

export const getConfigByFieldName = (fieldName: string) => {
  if (fieldName === "complexity") {
    return {
      label: "Complexity",
      options: [
        {
          value: Complexity.BEGINNER,
          label: COMPLEXITY_VALUES[Complexity.BEGINNER],
        },
        {
          value: Complexity.MEDIUM,
          label: COMPLEXITY_VALUES[Complexity.MEDIUM],
        },
        {
          value: Complexity.ADVANCED,
          label: COMPLEXITY_VALUES[Complexity.ADVANCED],
        },
        {
          value: Complexity.EXPERT,
          label: COMPLEXITY_VALUES[Complexity.EXPERT],
        },
      ],
      formatDisplayValue: convertComplexity,
    };
  }

  // category
  return {
    label: "Category",
    options: Object.values(QUIZ_CATEGORY).map((categoryValue) => ({
      value: categoryValue,
      label: categoryValue,
    })),
    formatDisplayValue: (value: string) => value || "Choose a category",
  };
};
