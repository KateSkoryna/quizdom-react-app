import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Col, Image, Row } from "react-bootstrap";
import styles from "./LogoutComponent.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useActiveNavStore, useOpenOffCanvas } from "../../../store/store";

export const LogoutComponent = ({
  avatar,
  name,
}: {
  avatar: string;
  name: string;
}) => {
  const active = useActiveNavStore((state) => state.active);
  const setActive = useActiveNavStore((state) => state.setActive);
  const setShow = useOpenOffCanvas((state) => state.setShow);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Nav
      activeKey={active}
      onSelect={(selectedKey) => selectedKey !== null && setActive(selectedKey)}
    >
      <Row className={styles.logoutNavbar}>
        <Col xs={12} md={4} className={styles.logoutNavbarContainer}>
          <Nav.Link
            as={Link}
            to="/user"
            eventKey="user"
            onClick={handleClose}
          >{`Hi, ${name}`}</Nav.Link>
        </Col>
        <Col xs={12} md={3} className={styles.logoutNavbarContainer}>
          <Image src={avatar} className={styles.userIcon} />
        </Col>
        <Col xs={12} md={3} className={styles.logoutNavbarContainer}>
          <Button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </Button>
        </Col>
      </Row>
    </Nav>
  );
};
