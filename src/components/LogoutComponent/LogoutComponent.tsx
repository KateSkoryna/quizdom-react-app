import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./LogoutComponent.module.css";

export const LogoutComponent = ({ avatar }: { avatar?: string }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row className={styles.logoutNavbar}>
        <Col xs={12} md={3} className={styles.logoutNavbarContainer}>
          <Image src={avatar} className={styles.userIcon} rounded />
        </Col>
        <Col xs={12} md={5} className={styles.logoutNavbarContainer}>
          <Button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
};
