import { NewsListComponent } from "../../components/NewsListComponent/NewsListComponent";
import { useLoaderData } from "react-router-dom";
import { Article } from "../../types/types";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
// import { HeroComponent } from "../../components/HeroComponent/HeroComponent";

export const NewsPage = () => {
  const news: Article[] = useLoaderData() as Article[];
  return (
    <>
      {/* <HeroComponent /> */}
      <SearchComponent />
      <NewsListComponent news={news} />
    </>
  );
};
