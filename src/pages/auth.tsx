import { useState, useEffect } from "react";
import { Container, Card, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/forms/loginForm";
import SignupForm from "../components/forms/signUpForm";
import styles from "../styles/pages/auth.module.scss";

const AuthPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    return location.pathname.includes("signup") ? "signup" : "login";
  });

  useEffect(() => {
    setActiveTab(location.pathname.includes("signup") ? "signup" : "login");
  }, [location.pathname]);

  return (
    <Container className={styles.authSection}>
      <div className={styles.bubble3}></div>
      <Card className={styles.authCard}>
        <Nav variant="tabs" className={styles.authTabs}>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "signup"}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className={styles.tabContent}>
          {activeTab === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </Card>
    </Container>
  );
};

export default AuthPage;
