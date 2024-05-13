import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/esm/Nav";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";

export const Footer = () => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Nav>
          <Nav.Link as={Link} to="/about">
            About us
          </Nav.Link>
        </Nav>
        <Nav>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact" className="offcanvas-link">
              <FaLinkedin />
            </Nav.Link>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact">
              <FaGithub />
            </Nav.Link>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact">
              <FaPhoneSquareAlt />
            </Nav.Link>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Nav.Link as={Link} to="/contact">
              <MdEmail />
            </Nav.Link>
          </Col>
        </Nav>
      </Card.Body>
      <Card.Footer className="text-muted">
        Copyright © 2024 by Kate Skoryna.
      </Card.Footer>
    </Card>
  );
};
