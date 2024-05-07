import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY;
const NEWS_BASE_URL = process.env.NEWS_BASE_URL;

const instance = axios.create({
  baseURL: NEWS_BASE_URL,
});

//======================== NEWS  ==========================

export async function getAllNews() {
  const url = `${NEWS_BASE_URL}?country=us&apiKey=${API_KEY}`;

  try {
    const { data } = await instance.get(url);
    console.log(data);
    return data.articles;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
