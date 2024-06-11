import axios from "axios";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  documentId,
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

export async function getCurrentUser(userId: string) {
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

//======================== GET AUTHOR NAME  =========================

export async function getAuthorName(userId: string) {
  try {
    const ref = doc(db, "users", userId);
    const user = await getDoc(ref);
    return user.data()?.name;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//======================== GET ALL QUIZES  ==========================

export async function getAllQuizes() {
  try {
    const snapshot = await getDocs(collection(db, "quizes"));
    const quizes = snapshot.docs.map((doc) => {
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

//======================== GET QUIZES BY CATEGORY  ======================

export async function getQuizByCategoryAndComplexity(queryData: {
  category: string | null;
  complexity: string | null;
}) {
  let q = query(
    collection(db, "quizes"),
    where("category", "==", queryData.category)
  );

  try {
    if (!queryData.category || queryData.complexity) {
      q = query(
        collection(db, "quizes"),
        where("complexity", "==", queryData.complexity)
      );
    }
    if (queryData.category && queryData.complexity) {
      q = query(
        collection(db, "quizes"),
        where("category", "==", queryData.category),
        where("complexity", "==", queryData.complexity)
      );
    }

    const querySnapshot = await getDocs(q);
    const quizes = querySnapshot.docs.map((doc) => {
      return {
        ...(doc.data() as UserQuiz),
        id: doc.id,
        publishedAt: doc.data().publishedAt.toDate(),
      };
    });
    return quizes;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//======================== TOGGLE FAVORITE QUIZ  ====================

export async function toggleFavorites(
  quizId: string,
  userId: string,
  action: string
) {
  try {
    const ref = doc(db, "users", userId);
    switch (action) {
      case "add":
        await updateDoc(ref, {
          favorites: arrayUnion(quizId),
        });
        break;
      case "remove":
        await updateDoc(ref, {
          favorites: arrayRemove(quizId),
        });
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//======================== GET FAVORITE QUIZES  ====================

export async function getFavoriteQuizes(quizIds: string[]) {
  try {
    const q = query(
      collection(db, "quizes"),
      where(documentId(), "in", quizIds)
    );
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

//======================== EDIT USER INFO  ====================

export async function editUserInfo(userId: string, info: string) {
  try {
    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      userInfo: info,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
