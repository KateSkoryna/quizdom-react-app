import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import { NewsListComponent } from "../../components/NewsListComponent/NewsListComponent";
import { useLoaderData } from "react-router-dom";
import { Article } from "../../types/types";
import { SearchNavBar } from "../../components/SearchNavBar/SearchNavBar";

export const NewsPage = () => {
  const news: Article[] = useLoaderData() as Article[];
  return (
    <>
      <SearchComponent />
      <SearchNavBar />
      <NewsListComponent news={news} />
    </>
  );
};
