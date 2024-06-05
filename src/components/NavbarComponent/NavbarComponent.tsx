import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import styles from "./NavbarComponent.module.css";
import CloseButton from "react-bootstrap/CloseButton";
import { useAuth } from "../../context/AuthContext";
import { LogoutComponent } from "../LogoutComponent/LogoutComponent";
import { useActiveNavStore } from "../../store/store";

export const NavbarComponent = () => {
  const [show, setShow] = useState(false);
  const active = useActiveNavStore((state) => state.active);
  const setActive = useActiveNavStore((state) => state.setActive);
  const { currentUser } = useAuth();

  const userName = currentUser?.name.split(" ")[0];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        className={styles.navbar}
        expand="lg"
        data-bs-theme="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} />
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
              <CloseButton className={styles.closeBtn} onClick={handleClose} />
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-lg-row justify-content-lg-between">
              <Nav
                className={styles.offcanvasNav}
                activeKey={active}
                onSelect={(selectedKey) =>
                  selectedKey !== null && setActive(selectedKey)
                }
              >
                <Nav.Link
                  as={Link}
                  to="/"
                  className={styles.navLink}
                  eventKey="quizes"
                >
                  Quizes
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/news"
                  className={styles.navLink}
                  eventKey="news"
                >
                  News
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/blogs"
                  className={styles.navLink}
                  eventKey="blogs"
                >
                  Blogs
                </Nav.Link>
              </Nav>
              {currentUser ? (
                <LogoutComponent
                  avatar={currentUser.avatar ?? ""}
                  name={userName ?? ""}
                />
              ) : (
                <Nav
                  className={styles.offcanvasNav}
                  activeKey={active}
                  onSelect={(selectedKey) =>
                    selectedKey !== null && setActive(selectedKey)
                  }
                >
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    className={styles.navLink}
                    eventKey="signup"
                  >
                    Sign Up
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={styles.navLink}
                    eventKey="login"
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
