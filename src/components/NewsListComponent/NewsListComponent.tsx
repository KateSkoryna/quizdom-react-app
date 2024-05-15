import { Article } from "../../types/types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DEFAULT_IMG } from "../../const/const";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import styles from "./NewsListComponent.module.css";

const truncateString = (s: string, w: number): string =>
  s.length > w ? s.slice(0, w) + "..." : s;

export const NewsListComponent = ({ news }: { news: Article[] }) => {
  return (
    <Container className={styles.newsContainer}>
      <Row className="g-3">
        {news.map(({ title, image, description, url }: Article) => (
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100" key={title}>
              <Card.Img
                className="object-fit-cover h-50 w-100"
                src={image !== null ? image : DEFAULT_IMG}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className="mb-4">
                  {truncateString(title, 64)}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  {description
                    ? truncateString(description, 90)
                    : "No description available"}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button href={url} target="_blank" className={styles.cardBtn}>
                  Read More
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
