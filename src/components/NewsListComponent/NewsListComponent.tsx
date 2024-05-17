import { Article } from "../../types/types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DEFAULT_IMG } from "../../const/const";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import styles from "./NewsListComponent.module.css";
import uuid from 'react-uuid';

const truncateString = (s: string, w: number): string =>
  s.length > w ? s.slice(0, w) + "..." : s;

export const NewsListComponent = ({ news }: { news: Article[] }) => {

  const newsArr = news.map(article => ({...article, id: uuid()}))
  return (
    <Container className={styles.newsContainer}>
      <Row className="g-3">
        {newsArr.map(({ id, title, image, description, url }: Article) => (
          <Col xs={12} sm={6} md={4} lg={3} key={id}>
            <Card className="h-100">
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
