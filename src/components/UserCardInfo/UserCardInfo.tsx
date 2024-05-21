import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import styles from "./UserCardInfo.module.css";

export const UserCardInfo = () => {
  return (
    <Card className={styles.userCardInfo}>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">About me</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#quizes">My quizes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#favorites">Favorites</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};
