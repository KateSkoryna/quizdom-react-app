import { UserCredential } from "firebase/auth";
import React from "react";

export interface Article {
  id: string;
  author: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
  NEUTRAL = "neutral",
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: Date;
  gender: GENDER;
  averageScore: number;
  userInfo: string;
  favorites: string[];
  location?: string;
}

export interface UserData {
  name: string;
  email: string;
  dateOfBirth?: Date;
  gender?: GENDER;
  password: string;
  confirmPassword: string;
}

export interface Joke {
  joke?: string;
  setup?: string;
  delivery?: string;
}

export enum NewsCategory {
  TECHNOLOGY = "technology",
  HEALTH = "health",
  SCIENCE = "science",
  BUSINESS = "business",
}

export interface HeroComponentProps {
  joke: string;
  hero: string;
  person: string;
}

export interface AuthContextValue {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (values: UserData) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface FormFooterProps {
  mainText: string;
  text: string;
  path: string;
}

export interface QuizFormProps {
  handleClose: () => void;
}

export interface Answer {
  answer: string;
  isCorrect: boolean;
}

export interface Question {
  questionTitle: string;
  answers: Answer[];
}

export enum QuizCategory {
  JS = "JavaScript",
  TS = "TypeScript",
  REACT = "ReactJS",
  NEXT_JS = "NextJS",
  NODE_JS = "NodeJS",
  JEST = "Jest",
}

export enum Complexity {
  BEGINNER = "1",
  MEDIUM = "2",
  ADVANCED = "3",
  EXPERT = "4",
}

export interface QuizFormState {
  title: string;
  description: string;
  complexity: Complexity;
  category: QuizCategory;
  questions: Question[];
}

export type QuizId = {
  id: string;
};

export type UserLocalQuiz = {
  title: string;
  description: string;
  complexity: Complexity;
  category: QuizCategory;
  questions: Question[];
  authorId: string;
  authorName: string;
  publishedAt: Date;
  rating?: number;
  commentsCount?: number;
  likesCount?: number;
};

export const NEWS_CATEGORY = {
  [NewsCategory.TECHNOLOGY]: "technology",
  [NewsCategory.HEALTH]: "health",
  [NewsCategory.BUSINESS]: "business",
  [NewsCategory.SCIENCE]: "science",
};

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
};

export type UserQuiz = UserLocalQuiz & QuizId;
