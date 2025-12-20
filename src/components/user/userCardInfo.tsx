import Tab from "react-bootstrap/Tab";
import UserQuizzesComponent from "./userQuizzesComponent";
import UserFavoritesComponent from "./userFavoritesComponent";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import styles from "../../styles/pages/user.module.scss";
import UserQuizList from "./userQuizList";

const UserCardInfo = () => {
  return (
    <Tab.Container id="user-card" defaultActiveKey="my-quizzes">
      <Col className={styles.userTabsContainer}>
        <Nav variant="tabs" className={styles.userTabs}>
          <Nav.Item>
            <Nav.Link eventKey="my-quizzes">My Quizzes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="favorites">Favorites</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="drafts">Drafts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="my-quizzes" title="My Quizzes">
            <UserQuizzesComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="favorites" title="Favorites">
            <UserFavoritesComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="drafts" title="Drafts">
            <UserQuizList status="draft" title="Draft Quizzes" />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Tab.Container>
  );
};

export default UserCardInfo;
