import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/esm/Nav";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { Container, Navbar } from "react-bootstrap";

export const Footer = () => {
  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      fixed="bottom"
      className="footer-navbar"
    >
      <Container className="footer-container">
        <Nav>
          <Nav.Link as={Link} to="/about" className="text-light">
            About us
          </Nav.Link>
        </Nav>
        <Nav className="footer-contact-navbar">
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-light footer-link"
            >
              <FaLinkedin className="footer-icon" />
            </Nav.Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-light footer-link"
            >
              <FaGithub className="footer-icon" />
            </Nav.Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-light footer-link"
            >
              <FaPhoneSquareAlt className="footer-icon" />
            </Nav.Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-light footer-link"
            >
              <MdEmail className="footer-icon" />
            </Nav.Link>
          </Col>
        </Nav>
        <Card.Footer className="text-light">
          Copyright © 2024 by Kate Skoryna.
        </Card.Footer>
      </Container>
    </Navbar>
  );
};
