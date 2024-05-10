import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";

// const navbar = {
//   backgroundColor: "#00093C",
// };

export const NavbarComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" className="navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleShow}
          />
          <Offcanvas
            show={show}
            onHide={handleClose}
            responsive="lg"
            style={{ backgroundColor: "#00093C" }}
            placement={"end"}
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/quizes" className="text-light">
                  Quizes
                </Nav.Link>
                <Nav.Link as={Link} to="/news" className="text-light">
                  News
                </Nav.Link>
                <Nav.Link as={Link} to="/blogs" className="text-light">
                  Blogs
                </Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/signup" className="text-light">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="text-light">
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
