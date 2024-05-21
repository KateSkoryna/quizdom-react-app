import { Button, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import styles from "./UserCard.module.css";

export const UserCard = () => {
  const { currentUser } = useAuth();

  const dateOfBirth = currentUser?.dateOfBirth
    .toLocaleDateString()
    .split("/")
    .join(".");

  return (
    <Card className={styles.card}>
      <Card.Body className="p-0">
        <Card.Img src={currentUser?.avatar} className={styles.cardImg} />
        <Card.Title className={styles.cardTitle}>
          {currentUser?.name}
        </Card.Title>
        <Card.Text className={styles.cardText}>{currentUser?.email}</Card.Text>
        <Card.Text className={styles.cardText}>{dateOfBirth}</Card.Text>
        <Card.Text className={styles.cardText}>{currentUser?.gender}</Card.Text>
        <Card.Footer>
          <Button className="w-100">Edit</Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
