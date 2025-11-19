import { Container, Card } from "react-bootstrap";
import SignupForm from "../components/forms/signUpForm";
import styles from "../styles/pages/auth.module.scss";

const SignupPage = () => {
  return (
    <Container className={styles.authSection}>
      <div className={styles.bubble3}></div>
      <Card className={styles.authCard}>
        <h2 className={styles.formTitle}>Signup Form</h2>
        <SignupForm />
      </Card>
    </Container>
  );
};

export default SignupPage;
