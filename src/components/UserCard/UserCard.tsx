import { Card } from "react-bootstrap";
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
      <Card.Img src={currentUser?.avatar} className={styles.cardImg} />
      <Card.Body>
        <Card.Title className={styles.cardTitle}>
          {currentUser?.name}
        </Card.Title>
        <Card.Text className={styles.cardText}>{currentUser?.email}</Card.Text>
        <Card.Text className={styles.cardText}>{dateOfBirth}</Card.Text>
        <Card.Text className={styles.cardText}>{currentUser?.gender}</Card.Text>
      </Card.Body>
    </Card>
  );
};
