import { NewsCategory } from "../types/types";

export const DEFAULT_IMG: string =
  "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2024/05/ipad-apple-event-logo.jpg";

export const CATEGORY: NewsCategory[] = [
  { id: 1, type: "technology" },
  { id: 2, type: "health" },
  { id: 3, type: "science" },
  { id: 4, type: "business" },
];

export const QUIZ_CATEGORY: Record<string, string> = {
  JS: "JavaScript",
  TS: "TypeScript",
  REACT: "React",
  NEXT: "NextJS",
  NODE_JS: "NodeJS",
  JEST: "Jest",
};
