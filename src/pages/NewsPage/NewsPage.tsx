import { NewsListComponent } from "../../components/NewsListComponent/NewsListComponent";
import { useLoaderData } from "react-router-dom";
import { Article } from "../../types/types";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import uuid from "react-uuid";

export const NewsPage = () => {
  const newsArr: Article[] = useLoaderData() as Article[];
  const news = newsArr.map((article) => ({ ...article, id: uuid() }));

  return (
    <>
      <SearchComponent />
      <NewsListComponent news={news} />
    </>
  );
};
