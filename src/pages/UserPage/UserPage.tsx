import styles from "./UserPage.module.css";
import { Card, Container } from "react-bootstrap";
import { UserCardData } from "../../components/UserPageComponents/UserCardData/UserCardData";
import { UserCardInfo } from "../../components/UserPageComponents/UserCardInfo/UserCardInfo";

const UserPage = () => {
  return (
    <Container className={styles.userSection}>
      <Card className={styles.userSectionCard}>
        <UserCardData />
        <UserCardInfo />
      </Card>
    </Container>
  );
};

export default UserPage;
