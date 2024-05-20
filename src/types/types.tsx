import { UserCredential } from "firebase/auth";

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

export interface CurrentUser {
  name: string;
  email: string;
  avatar?: string;
}

export interface UserData extends CurrentUser {
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

export interface Category {
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
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
