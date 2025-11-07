import styles from "../styles/pages/user.module.scss";
import { Card, Container } from "react-bootstrap";
import UserCardData from "../components/user/userCardData";
import UserCardInfo from "../components/user/userCardInfo";

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
