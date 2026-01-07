import { useState, useCallback } from "react";
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

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export const useNews = (): UseNewsReturn => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (category: string, keywords: string) => {
    const url = `${NEWS_BASE_URL}?access_key=${API_KEY}&category=${category}&languages=en&keywords=${keywords}`;

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(url);
      setNews(data.data || []);
      setIsLoading(false);
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  return { news, isLoading, error, fetchNews };
};
