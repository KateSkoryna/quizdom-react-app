import styles from "../styles/pages/UserPage.module.scss";
import { Card, Container } from "react-bootstrap";
import { UserCardData } from "../components/user/UserCardData";
import { UserCardInfo } from "../components/user/UserCardInfo";

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
