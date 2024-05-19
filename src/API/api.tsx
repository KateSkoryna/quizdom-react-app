import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

//======================== NEWS  ==========================

export async function getAllNews(query: string, category: string) {
  const url = `${NEWS_BASE_URL}?q=${query}&category=${category}&max=12&lang=en&apikey=${API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return data.articles;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
