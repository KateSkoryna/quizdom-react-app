export type Article = {
  author: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
};

export interface currentUser {
  email: string;
  password: string;
}

export interface UserData extends currentUser {
  name: string;
  dateOfBirth: string;
  gender: string;
  confirmPassword: string;
}

export interface Joke {
  joke?: string;
  setup?: string;
  delivery?: string;
}

export interface HeroComponentProps {
  joke: string;
  hero: string;
  person: string;
}
