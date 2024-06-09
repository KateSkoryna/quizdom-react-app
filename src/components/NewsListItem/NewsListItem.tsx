import { Button, Card } from "react-bootstrap";
import styles from "./NewsListItem.module.css";
import { truncateString } from "../../helpers/truncateString";

export const NewsListItem = ({
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
      <Card.Img className="object-fit-cover h-50 w-100" src={image} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className="mb-4">{truncateString(title, 64)}</Card.Title>
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
