import NewsListComponent from "../components/news/newsList";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Article, NEWS_CATEGORY } from "../types/types";
import SearchComponent from "../components/news/searchComponent";
import Loader from "../components/common/loader";

const NewsPage = () => {
  const navigation = useNavigation();
  const newsList: Article[] = useLoaderData() as Article[];
  const news = newsList.map((article, index) => ({
    ...article,
    id: `${new Date().getTime()}-${index}`
  }));
  const values: string[] = Object.values(NEWS_CATEGORY);

  return (
    <>
      <SearchComponent categories={values} />
      {navigation.state === "loading" ? (
        <Loader />
      ) : (
        <NewsListComponent news={news} />
      )}
    </>
  );
};

export default NewsPage;
