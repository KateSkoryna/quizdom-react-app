import { COMPLEXITY_VALUES } from "../const/const";
import { Complexity } from "../types/types";

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
