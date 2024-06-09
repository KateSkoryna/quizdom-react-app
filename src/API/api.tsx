import axios from "axios";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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

//======================== GET USER  ==========================

export async function getUser(id: string) {
  try {
    const ref = doc(db, "users", id);
    const user = await getDoc(ref);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
