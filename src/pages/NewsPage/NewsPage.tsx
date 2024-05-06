import { SearchBar } from "../../SearchBar/SearchBar";
import { NewsListComponent } from "../../components/NewsListComponent/NewsListComponent";
import { useLoaderData } from "react-router-dom";
import { Article } from "../../types/types";
import Container from "react-bootstrap/esm/Container";

export const NewsPage = () => {
  const news: Article[] = useLoaderData() as Article[];
  return (
    <Container>
      <h2>News Page</h2>
      <SearchBar />
      <NewsListComponent news={news} />
    </Container>
  );
};
