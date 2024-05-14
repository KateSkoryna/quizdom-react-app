import { Article } from "../../types/types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DEFAULT_IMG } from "../../const/const";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";

const truncateString = (s: string, w: number): string =>
  s.length > w ? s.slice(0, w) + "..." : s;

export const NewsListComponent = ({ news }: { news: Article[] }) => {
  console.log(news);
  return (
    <Container className="news-container">
      <Row className="g-3">
        {news.map(({ title, image, description, url }: Article) => (
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100" key={title}>
              <Card.Img src={image !== null ? image : DEFAULT_IMG} />
              <Card.Body>
                <Card.Title>{truncateString(title, 52)}</Card.Title>
                <Card.Text>
                  {description
                    ? truncateString(description, 68)
                    : "No description available"}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button as="a" href={url} className="news-link w-100">
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
