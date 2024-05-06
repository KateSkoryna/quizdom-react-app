import { Article } from "../../types/types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { DEFAULT_IMG } from "../../const/const";

export const NewsListComponent = ({ news }: { news: Article[] }) => {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {news.map(({ title, urlToImage, description }: Article) => (
        <Col key={title}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={urlToImage !== null ? urlToImage : DEFAULT_IMG}
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
