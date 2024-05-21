import styles from "./UserPage.module.css";
import { Card, Container } from "react-bootstrap";
import { UserCard } from "../../components/UserCard/UserCard";
export const UserPage = () => {
  return (
    <Container className={styles.userSection}>
      <Card className="p-2">
        <UserCard />
      </Card>
    </Container>
  );
};
