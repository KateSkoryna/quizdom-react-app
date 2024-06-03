import { Complexity } from "../types/types";

export const convertComplexity = (complexity: string) => {
  switch (complexity) {
    case "1":
      return Complexity.BEGINNER;
    case "2":
      return Complexity.MEDIUM;
    case "3":
      return Complexity.ADVANCED;
    case "4":
      return Complexity.EXPERT;
    default:
      return Complexity.BEGINNER;
  }
};
