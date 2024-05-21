import styles from "./UserPage.module.css";
import { Card, Container } from "react-bootstrap";
import { UserCard } from "../../components/UserCard/UserCard";
import { UserCardInfo } from "../../components/UserCardInfo/UserCardInfo";
export const UserPage = () => {
  return (
    <Container className={styles.userSection}>
      <Card className={styles.userSectionCard}>
        <UserCard />
        <UserCardInfo />
      </Card>
    </Container>
  );
};
