import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect } from "react";
import styles from "./NavbarComponent.module.css";
import CloseButton from "react-bootstrap/CloseButton";
import { useAuth } from "../../context/AuthContext";
import { LogoutComponent } from "../UserPageComponents/LogoutComponent/LogoutComponent";
import { useActiveNavStore, useOpenOffCanvas } from "../../store/store";

export const NavbarComponent = () => {
  // const [show, setShow] = useState(false);
  const active = useActiveNavStore((state) => state.active);
  const setActive = useActiveNavStore((state) => state.setActive);
  const show = useOpenOffCanvas((state) => state.show);
  const setShow = useOpenOffCanvas((state) => state.setShow);
  const { currentUser } = useAuth();

  const userName = currentUser?.name.split(" ")[0];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setActive("/");
  }, [setActive]);

  return (
    <>
      <Navbar expand="lg" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={() => setActive("/")}>
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
                  to="/quizes"
                  eventKey="quizes"
                  onClick={handleClose}
                >
                  Quizes
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/news"
                  eventKey="news"
                  onClick={handleClose}
                >
                  News
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/blogs"
                  eventKey="blogs"
                  onClick={handleClose}
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
                    onClick={handleClose}
                  >
                    Sign Up
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={styles.navLink}
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
