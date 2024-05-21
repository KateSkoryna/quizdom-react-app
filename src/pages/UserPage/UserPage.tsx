import { useAuth } from "../../context/AuthContext";
import styles from "./UserPage.module.css";
import { Container } from "react-bootstrap";
export const UserPage = () => {
  const { currentUser } = useAuth();
  return (
    <Container className={styles.userSection}>
      <h2>{currentUser?.name}</h2>
    </Container>
  );
};
