import axios from "axios";
import { CATEGORY } from "../const/const";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

const instance = axios.create({
  baseURL: NEWS_BASE_URL,
});

//======================== NEWS  ==========================

export async function getAllNews() {
  const url = `${NEWS_BASE_URL}` + `${CATEGORY.GENERAL}&apikey=${API_KEY}`;

  try {
    const { data } = await instance.get(url);

    return data.articles;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
