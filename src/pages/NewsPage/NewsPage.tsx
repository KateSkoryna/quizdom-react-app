import { NewsListComponent } from "../../components/NewsListComponent/NewsListComponent";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Article } from "../../types/types";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import uuid from "react-uuid";
import { Loader } from "../../components/Loader/Loader";

export const NewsPage = () => {
  const navigation = useNavigation();

  const newsArr: Article[] = useLoaderData() as Article[];
  const news = newsArr.map((article) => ({ ...article, id: uuid() }));

  return (
    <>
      <SearchComponent />
      {navigation.state === "loading" ? (
        <Loader />
      ) : (
        <NewsListComponent news={news} />
      )}
    </>
  );
};
