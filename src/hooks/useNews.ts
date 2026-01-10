import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  published_at: string;
  source: string;
}

interface UseNewsReturn {
  news: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  fetchNews: (category: string, keywords: string) => Promise<void>;
}

export enum NewsCategory {
  TECHNOLOGY = "technology",
  HEALTH = "health",
  SCIENCE = "science",
  BUSINESS = "business",
}

export const CATEGORIES: string[] = Object.values(NewsCategory);

export const DEFAULT_CATEGORY = NewsCategory.TECHNOLOGY;

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export function resolveCategory(value: string | null | undefined): NewsCategory {
  if (Object.values(NewsCategory).includes(value as NewsCategory)) {
    return value as NewsCategory;
  }

  return DEFAULT_CATEGORY;
}

async function fetchNews(category: NewsCategory, keywords: string) {
  const { data } = await axios.get(NEWS_BASE_URL, {
    params: {
      access_key: API_KEY,
      categories: category,
      languages: "en",
      keywords: keywords || undefined,
    },
  });

  return data.data ?? [];
}

export function useNews(categoryParam: string | null, keywordsParam: string | null) {
  const category = resolveCategory(categoryParam);
  const keywords = keywordsParam ?? "";

  return useQuery({
    queryKey: ["news", category, keywords],
    queryFn: () => fetchNews(category, keywords),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
