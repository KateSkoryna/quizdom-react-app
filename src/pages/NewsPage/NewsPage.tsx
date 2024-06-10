import { NewsListComponent } from "../../components/NewsPageComponents/NewsListComponent/NewsListComponent";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Article } from "../../types/types";
import { SearchComponent } from "../../components/NewsPageComponents/SearchComponent/SearchComponent";
import uuid from "react-uuid";
import { Loader } from "../../components/Loader/Loader";
import { NEWS_CATEGORY } from "../../const/const";

export const NewsPage = () => {
  const navigation = useNavigation();

  const newsArr: Article[] = useLoaderData() as Article[];
  const news = newsArr.map((article) => ({ ...article, id: uuid() }));
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
