import { SearchBar } from "../../SearchBar/SearchBar";
import { NewsListComponent } from "../../components/NewsListComponent/NewsListComponent";

export const NewsPage = () => {
  return (
    <>
      <h2>News Page</h2>
      <SearchBar />
      <NewsListComponent />
    </>
  );
};
