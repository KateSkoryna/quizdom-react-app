import { Container, Card } from "react-bootstrap";
import SignupForm from "../components/forms/signUpForm";
import styles from "../../styles/pages/signup.module.scss";

const SignupPage = () => {
  return (
    <Container className={styles.signupSection}>
      <Card className={styles.signupCard}>
        <h2 className={styles.formTitle}>Signup Form</h2>
        <SignupForm />
      </Card>
    </Container>
  );
};

export default SignupPage;
