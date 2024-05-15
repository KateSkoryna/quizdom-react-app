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

export const NavbarComponent = () => {
  const [show, setShow] = useState(false);

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
              <Nav className={styles.offcanvasNav}>
                <Nav.Link as={Link} to="/quizes" className={styles.navLink}>
                  Quizes
                </Nav.Link>
                <Nav.Link as={Link} to="/news" className={styles.navLink}>
                  News
                </Nav.Link>
                <Nav.Link as={Link} to="/blogs" className={styles.navLink}>
                  Blogs
                </Nav.Link>
              </Nav>
              <Nav className={styles.offcanvasNav}>
                <Nav.Link as={Link} to="/signup" className={styles.navLink}>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className={styles.navLink}>
                  Log In
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
