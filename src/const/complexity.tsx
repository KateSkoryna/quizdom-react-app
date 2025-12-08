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

export const getConfigByFieldName = (fieldName: string) => {
  if (fieldName === "complexity") {
    return {
      label: "Complexity level",
      options: [
        { value: Complexity.BEGINNER, label: COMPLEXITY_VALUES[Complexity.BEGINNER] },
        { value: Complexity.MEDIUM, label: COMPLEXITY_VALUES[Complexity.MEDIUM] },
        { value: Complexity.ADVANCED, label: COMPLEXITY_VALUES[Complexity.ADVANCED] },
        { value: Complexity.EXPERT, label: COMPLEXITY_VALUES[Complexity.EXPERT] },
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
