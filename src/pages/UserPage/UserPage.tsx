import styles from "./UserPage.module.css";
import { Card, Container } from "react-bootstrap";
import { UserCardData } from "../../components/UserCardData/UserCardData";
import { UserCardInfo } from "../../components/UserCardInfo/UserCardInfo";
import { useAuth } from "../../context/AuthContext";

export const UserPage = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Container className={styles.userSection}>
      <Card className={styles.userSectionCard}>
        <UserCardData />
        <UserCardInfo />
      </Card>
    </Container>
  );
};
