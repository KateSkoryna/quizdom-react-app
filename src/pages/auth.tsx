import { useState } from "react";
import { Container, Card } from "react-bootstrap";
import GoogleAuthHandler from "../components/forms/googleAuthHandler";
import UnifiedAuthForm, { AuthMode } from "../components/forms/unifiedAuthForm";
import styles from "../styles/pages/auth.module.scss";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <Container className={styles.authSection}>
      <div className={styles.bubble3}></div>
      <Card className={styles.authCard}>
        <h2 className={styles.authTitle}>Welcome to Quizdom</h2>

        <GoogleAuthHandler />

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <UnifiedAuthForm mode={mode} onModeChange={setMode} />
      </Card>
    </Container>
  );
};

export default AuthPage;
