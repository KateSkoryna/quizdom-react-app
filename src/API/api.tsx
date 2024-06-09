import axios from "axios";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { UserQuiz } from "../types/types";

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

export async function getUser(userId: string) {
  try {
    const ref = doc(db, "users", userId);
    const user = await getDoc(ref);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//======================== GET ALL QUIZES  ==========================
//======================== GET QUIZES BY USER  ======================

export async function getQuizesById(userId: string) {
  try {
    const q = query(collection(db, "quizes"), where("author", "==", userId));
    const querySnapshot = await getDocs(q);

    const quizes = querySnapshot.docs.map((doc) => {
      return {
        ...(doc.data() as UserQuiz),
        id: doc.id,
        publishedAt: doc.data().publishedAt.toDate(),
      };
    });
    return quizes;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
