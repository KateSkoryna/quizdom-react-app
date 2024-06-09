import { Article } from "../../types/types";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import styles from "./NewsListComponent.module.css";
import { NewsListItem } from "../NewsListItem/NewsListItem";
import { DEFAULT_IMG } from "../../const/const";
import { truncateString } from "../../helpers/truncateString";

export const NewsListComponent = ({ news }: { news: Article[] }) => {
  return (
    <Container className={styles.newsContainer}>
      <Row className="g-3">
        {news.map(({ id, title, image, description, url }: Article) => (
          <Col key={id} xs={12} sm={6} md={4} lg={3}>
            <NewsListItem
              image={image ?? DEFAULT_IMG}
              title={title}
              description={
                description
                  ? truncateString(description, 90)
                  : "No description available"
              }
              url={url}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
