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

type Gender = "male" | "female";

export interface LoginUser {
  email: string;
  password: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: Date;
  gender: Gender;
  password: string;
  avarageScore: number;
  userInfo: string;
  favorites: string[];
}

export interface UserData {
  name: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  password: string;
  confirmPassword: string;
}

export interface Joke {
  joke?: string;
  setup?: string;
  delivery?: string;
}

export interface NewsCategory {
  id: number;
  type: string;
}

export interface HeroComponentProps {
  joke: string;
  hero: string;
  person: string;
}

export interface AuthContextValue {
  currentUser: CurrentUser | null;
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

interface Answer {
  answer: string;
  isCorrect: boolean;
}

interface Question {
  questionTitle: string;
  answers: Answer[];
}

export enum QuizCategory {
  JS = "JavaScript",
  TS = "TypeScript",
  REACT = "React",
  NEXT = "NextJS",
  NODE_JS = "NodeJS",
  JEST = "Jest",
}

export enum Complexity {
  BEGINNER = "beginner",
  MEDIUM = "medium",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export interface QuizFormState {
  title: string;
  description: string;
  complexity: Complexity;
  category: QuizCategory;
  questions: Question[];
}
