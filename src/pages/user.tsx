import styles from "../styles/pages/user.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import UserCardData from "../components/user/userCardData";
import UserCardInfo from "../components/user/userCardInfo";
import { ErrorBoundary } from "react-error-boundary";
import SectionErrorFallback from "../components/fallback/sectionErrorFallback";

const UserPage = () => {
  return (
    <Container className={styles.userSection}>
      <Row className="g-3 g-lg-4">
        <Col xs={12} lg={3} className="d-flex">
          <ErrorBoundary FallbackComponent={(props) => <SectionErrorFallback {...props} section="user profile" />}>
            <UserCardData />
          </ErrorBoundary>
        </Col>
        <Col xs={12} lg={9} className="d-flex">
          <ErrorBoundary FallbackComponent={(props) => <SectionErrorFallback {...props} section="user quizzes" />}>
            <UserCardInfo />
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
