import { Button, Card } from "react-bootstrap";
import styles from "../../styles/pages/news.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewsListItem = ({
  image,
  title,
  description,
  url,
}: {
  image: string;
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <Card className="h-100">
      <LazyLoadImage src={image} className={styles.cardImg} alt={title} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={`mb-4 ${styles.cardTitle}`}>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button href={url} target="_blank" className={styles.cardBtn}>
          Read More
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default NewsListItem;
