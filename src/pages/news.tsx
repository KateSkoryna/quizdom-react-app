import NewsListComponent from "../components/news/newsList";
import { useLoaderData, useNavigation } from "react-router-dom";
import SearchComponent from "../components/news/searchComponent";
import Loader from "../components/common/loader";

export interface Article {
  id: string;
  author: string;
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
  const navigation = useNavigation();
  const newsList: Article[] = useLoaderData() as Article[];
  const news = newsList.map((article, index) => ({
    ...article,
    id: `${new Date().getTime()}-${index}`,
  }));
  const values: string[] = Object.values(NEWS_CATEGORY);

  return (
    <>
      <SearchComponent categories={values} />
      {navigation.state === "loading" ? <Loader /> : <NewsListComponent news={news} />}
    </>
  );
};

export default NewsPage;
