import { useSearchParams } from "react-router-dom";
import NewsListComponent from "../components/news/newsList";
import Loader from "../components/common/loader";
import { CATEGORIES, DEFAULT_CATEGORY, useNews } from "../hooks/useNews";
import { ErrorBoundary } from "react-error-boundary";
import SectionErrorFallback from "../components/fallback/sectionErrorFallback";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { Container } from "react-bootstrap";
import SearchForm from "../components/forms/searchForm";
import styles from "../styles/pages/news.module.scss";

export interface Article {
  author?: string;
  category: string;
  country: string;
  description?: string;
  image?: string;
  language: string;
  published_at: string;
  source: string;
  title: string;
  url: string;
}

const NewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? DEFAULT_CATEGORY;

  const { data: news, isLoading } = useNews(category, query);

  const handleCategoryClick = (category: string) => {
    setSearchParams({ category });
  };

  return (
    <Container style={{ paddingTop: "100px" }}>
      <>
        <SearchForm
          query={query}
          category={category}
          setSearchParams={(next) => setSearchParams(next)}
        />
        <Nav className={styles.searchNavbar}>
          {CATEGORIES.map((categoryParam) => (
            <Nav.Item key={categoryParam}>
              <Nav.Link
                as={Button}
                onClick={() => handleCategoryClick(categoryParam)}
                className={`${styles.categoryBtn} ${categoryParam === category ? styles.selected : ""}`}
              >
                {categoryParam}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </>

      {isLoading ? (
        <Loader />
      ) : (
        <ErrorBoundary
          FallbackComponent={(props) => <SectionErrorFallback {...props} section="news list" />}
        >
          <NewsListComponent news={news} />
        </ErrorBoundary>
      )}
    </Container>
  );
};

export default NewsPage;
