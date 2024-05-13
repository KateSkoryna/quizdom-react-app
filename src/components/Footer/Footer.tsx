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
    <Navbar expand="lg" data-bs-theme="dark" fixed="bottom">
      <Container>
        <Nav>
          <Nav.Link as={Link} to="/about" className="text-light">
            About us
          </Nav.Link>
        </Nav>
        <Nav>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact" className="text-light">
              <FaLinkedin />
            </Nav.Link>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact" className="text-light">
              <FaGithub />
            </Nav.Link>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact" className="text-light">
              <FaPhoneSquareAlt />
            </Nav.Link>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact" className="text-light">
              <MdEmail />
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
