import styles from "./UserPage.module.css";
import { Card, Container } from "react-bootstrap";
import { UserCard } from "../../components/UserCard/UserCard";
import { UserCardInfo } from "../../components/UserCardInfo/UserCardInfo";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const UserPage = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Container className={styles.userSection}>
      <Card className={styles.userSectionCard}>
        <UserCard />
        <UserCardInfo />
      </Card>
    </Container>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
