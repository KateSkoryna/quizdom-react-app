import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NewsListComponent from "../components/news/newsList";
import SearchComponent from "../components/news/searchComponent";
import Loader from "../components/common/loader";
import { useNews } from "../hooks/useNews";

export interface Article {
  id: string;
  author?: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
}

enum NewsCategory {
  TECHNOLOGY = "technology",
  HEALTH = "health",
  SCIENCE = "science",
  BUSINESS = "business",
}

const NEWS_CATEGORY = {
  [NewsCategory.TECHNOLOGY]: "technology",
  [NewsCategory.HEALTH]: "health",
  [NewsCategory.BUSINESS]: "business",
  [NewsCategory.SCIENCE]: "science",
};

const NewsPage = () => {
  const [searchParams] = useSearchParams();
  const { news: newsList, isLoading, fetchNews } = useNews();

  const searchQuery = searchParams.get("query") || "none";
  const searchCategory = searchParams.get("category") || "technology";
  const values: string[] = Object.values(NEWS_CATEGORY);

  // Fetch news when search params change
  useEffect(() => {
    fetchNews(searchCategory, searchQuery);
  }, [searchCategory, searchQuery]);

  const news = newsList.map((article, index) => ({
    ...article,
    id: `${new Date().getTime()}-${index}`,
  }));

  return (
    <>
      <SearchComponent categories={values} />
      {isLoading ? <Loader /> : <NewsListComponent news={news} />}
    </>
  );
};

export default NewsPage;
