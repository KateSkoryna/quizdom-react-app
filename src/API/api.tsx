import axios from "axios";
import { CATEGORY } from "../const/const";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;
const JOKES_BASE_URL = import.meta.env.VITE_JOKE_BASE_URL;

//======================== NEWS  ==========================

export async function getAllNews() {
  const url = `${NEWS_BASE_URL}category${CATEGORY.TECHNOLOGY}&apikey=${API_KEY}`;
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

export async function getJoke() {
  try {
    const { data } = await axios.get(JOKES_BASE_URL);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
