import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useMemo } from "react";
import styles from "../../styles/components/navbar.module.scss";
import CloseButton from "react-bootstrap/CloseButton";
import LogoutComponent from "../user/logoutComponent";
import { type AuthStore, useAuthStore } from "../../store/authStore";

const NavbarContainer = () => {
  const location = useLocation();
  const currentUser = useAuthStore((state: AuthStore) => state.currentUser);
  const [show, setShow] = useState(false);

  const userName = currentUser?.displayName?.split(" ")[0];
  const isUserPage = location.pathname.includes("/user");

  const active = useMemo(() => {
    return location.pathname.split("/")[1] || "/";
  }, [location.pathname]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        expand="lg"
        data-bs-theme="light"
        fixed="top"
        className={`${styles.navbar} ${isUserPage ? styles.navbarUser : ""}`}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src={isUserPage ? logoLight : logoDark} />
          </Navbar.Brand>
          <Navbar.Toggle
            className={styles.navbarToggle}
            aria-controls="basic-navbar-nav"
            onClick={handleShow}
          />
          <Offcanvas
            show={show}
            onHide={handleClose}
            responsive="lg"
            placement={"end"}
            className={styles.offcanvasNavbar}
          >
            <Offcanvas.Header className={styles.offcanvasHeader}>
              <CloseButton onClick={handleClose} />
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-lg-row justify-content-lg-between">
              <Nav className={styles.offcanvasNav} activeKey={active}>
                <Nav.Link
                  as={Link}
                  to="/quizzes"
                  className={`${styles.navLink} ${isUserPage ? styles.navLinkLight : ""}`}
                  eventKey="quizzes"
                  onClick={handleClose}
                >
                  Quizzes
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/news"
                  className={`${styles.navLink} ${isUserPage ? styles.navLinkLight : ""}`}
                  eventKey="news"
                  onClick={handleClose}
                >
                  News
                </Nav.Link>
              </Nav>
              {currentUser ? (
                <LogoutComponent
                  avatar={currentUser.photoURL}
                  name={userName ?? ""}
                  isUserPage={isUserPage}
                  onClose={handleClose}
                />
              ) : (
                <Nav className={styles.offcanvasNav} activeKey={active}>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={`${styles.navLink} ${isUserPage ? styles.navLinkLight : ""}`}
                    eventKey="login"
                    onClick={handleClose}
                  >
                    Log In
                  </Nav.Link>
                </Nav>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarContainer;
