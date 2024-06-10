import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/esm/Nav";
import Col from "react-bootstrap/Col";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { Container, Navbar } from "react-bootstrap";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      fixed="bottom"
      className={styles.footerNavbar}
    >
      <Container className={styles.footerContainer}>
        <Nav.Link as={Link} to="/" className={styles.footerLink}>
          About us
        </Nav.Link>
        <Nav className={styles.footerContactNavbar}>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              href="https://www.linkedin.com/in/kateskoryna/"
              target="_blank"
              className={styles.footerContactLink}
            >
              <FaLinkedin className={styles.footerIcon} />
            </Nav.Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              href="https://github.com/kateskoryna"
              target="_blank"
              className={styles.footerContactLink}
            >
              <FaGithub className={styles.footerIcon} />
            </Nav.Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              href="tel:+4916099814255"
              target="_blank"
              className={styles.footerContactLink}
            >
              <FaPhoneSquareAlt className={styles.footerIcon} />
            </Nav.Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              href="mailto:k.skoryna@gmail.com"
              target="_blank"
              className={styles.footerContactLink}
            >
              <MdEmail className={styles.footerIcon} />
            </Nav.Link>
          </Col>
        </Nav>
        <Card.Text>Copyright © 2024 by Kate Skoryna.</Card.Text>
      </Container>
    </Navbar>
  );
};
