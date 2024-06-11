import Tab from "react-bootstrap/Tab";
import { StatisticsUserComponent } from "../StatisticsUserComponent/StatisticsUserComponent";
import { UserQuizesComponent } from "../UserQuizesComponent/UserQuizesComponent";
import { UserFavoritesComponent } from "../UserFavoritesComponent/UserFavoritesComponent";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styles from "./UserCardInfo.module.css";

export const UserCardInfo = () => {
  return (
    <Tab.Container id="user-card" defaultActiveKey="statistics">
      <Col>
        <Nav variant="tabs" className="p-0" fill>
          <Nav.Item>
            <Nav.Link
              className={styles.show}
              as={Link}
              to="#statistics"
              eventKey="statistics"
            >
              Statistics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={styles.show}
              as={Link}
              to="#my-quizes"
              eventKey="my-quizes"
            >
              My Quizes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={styles.show}
              as={Link}
              to="#favorites"
              eventKey="favorites"
            >
              Favorites
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="statistics" title="Statistics">
            <StatisticsUserComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="my-quizes" title="My Quizes">
            <UserQuizesComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="favorites" title="Favorites">
            <UserFavoritesComponent />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Tab.Container>
  );
};
