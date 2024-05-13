export type Article = {
  author: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
};

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
