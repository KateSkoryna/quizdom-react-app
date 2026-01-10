import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from "../../styles/pages/news.module.scss";
import NewsListItem from "./newsListItem";
import { DEFAULT_IMG } from "../../const/const";
import type { Article } from "../../pages/news";

const NewsListComponent = ({ news }: { news: Article[] }) => {
  return (
    <Container className={styles.newsContainer}>
      <Row className="g-3">
        {news.map(({ title, image, description, url }: Article) => (
          <Col key={url} xs={12} sm={6} md={4} lg={3}>
            <NewsListItem
              image={image ?? DEFAULT_IMG}
              title={title}
              description={description || "No description available"}
              url={url}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewsListComponent;
