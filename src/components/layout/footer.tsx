import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/esm/Nav";
import { Container, Navbar } from "react-bootstrap";
import styles from "../../styles/components/footer.module.scss";

const Footer = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" fixed="bottom" className={styles.footerNavbar}>
      <Container className={styles.footerContainer}>
        <Nav className={styles.footerContactNavbar}>
          <Nav.Link
            href="https://www.linkedin.com/in/kateskoryna/"
            target="_blank"
            className={`${styles.footerContactLink} ${styles.linkedinIcon}`}
            aria-label="linkedin link"
          />
          <Nav.Link
            href="https://github.com/kateskoryna"
            target="_blank"
            className={`${styles.footerContactLink} ${styles.githubIcon}`}
            aria-label="github link"
          />
          <Nav.Link
            href="tel:+4916099814255"
            target="_blank"
            className={`${styles.footerContactLink} ${styles.phoneIcon}`}
            aria-label="phone number"
          />
          <Nav.Link
            href="mailto:k.skoryna@gmail.com"
            target="_blank"
            className={`${styles.footerContactLink} ${styles.emailIcon}`}
            aria-label="email link"
          />
        </Nav>
        <Card.Text>Copyright © 2025 by Kate Skoryna</Card.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
