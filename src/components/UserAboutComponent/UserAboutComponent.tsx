import { Container } from "react-bootstrap";
import styles from "./UserAboutComponent.module.css";

export const UserAboutComponent = ({ info }: { info: string }) => {
  return (
    <div>
      <Container>
        <h4>About me</h4>
        <p className={styles.aboutText}>{info}</p>
      </Container>
    </div>
  );
};
