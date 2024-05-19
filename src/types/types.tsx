export interface Article {
  id: string;
  author: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
}

export interface CurrentUser {
  email: string;
  password: string;
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

export interface Category {
  id: number;
  type: string;
}

export interface HeroComponentProps {
  joke: string;
  hero: string;
  person: string;
}
