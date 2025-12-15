import { Button } from "react-bootstrap";
import styles from "../../styles/pages/auth.module.scss";
import googleIcon from "../../assets/google.svg";

interface GoogleAuthButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const GoogleAuthButton = ({ onClick, isLoading = false }: GoogleAuthButtonProps) => {
  return (
    <Button
      variant="outline-secondary"
      className={styles.googleBtn}
      onClick={onClick}
      disabled={isLoading}
      type="button"
    >
      <img src={googleIcon} className={styles.googleIcon} alt="Google" />
      <span className={styles.googleText}>{isLoading ? "Loading..." : "Login with Google"}</span>
    </Button>
  );
};

export default GoogleAuthButton;
