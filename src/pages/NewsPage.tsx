import { NewsListComponent } from "../components/news/NewsListComponent";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Article } from "../types/types";
import { SearchComponent } from "../components/news/SearchComponent";
import uuid from "react-uuid";
import { NEWS_CATEGORY } from "../const/const";
import Loader from "../components/common/Loader";

const NewsPage = () => {
  const navigation = useNavigation();

  const newsList: Article[] = useLoaderData() as Article[];
  const news = newsList.map((article) => ({ ...article, id: uuid() }));
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
