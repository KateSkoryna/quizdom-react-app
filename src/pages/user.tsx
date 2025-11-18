import styles from "../styles/pages/user.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import UserCardData from "../components/user/userCardData";
import UserCardInfo from "../components/user/userCardInfo";

const UserPage = () => {
  return (
    <Container className={styles.userSection}>
      <Row className="g-3 g-lg-4 h-100">
        <Col xs={12} lg={3} className="d-flex">
          <UserCardData />
        </Col>
        <Col xs={12} lg={9} className="d-flex">
          <UserCardInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
