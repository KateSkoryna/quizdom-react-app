import styles from "./UserPage.module.css";
import { Card, Container } from "react-bootstrap";
import { UserCardData } from "../../components/UserCardData/UserCardData";
import { UserCardInfo } from "../../components/UserCardInfo/UserCardInfo";

export const UserPage = () => {
  return (
    <Container className={styles.userSection}>
      <Card className={styles.userSectionCard}>
        <UserCardData />
        <UserCardInfo />
      </Card>
    </Container>
  );
};
