import { Article } from "../../types/types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { DEFAULT_IMG } from "../../const/const";

export const NewsListComponent = ({ news }: { news: Article[] }) => {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {news.map(({ title, image, description }: Article) => (
        <Col key={title}>
          <Card>
            <Card.Img
              variant="top"
              src={image !== null ? image : DEFAULT_IMG}
              className="img-fluid mx-auto d-block"
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
