import { useState, type CSSProperties } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { MdFavoriteBorder, MdInsights, MdOutlineEditNote, MdOutlineQuiz } from "react-icons/md";
import UserQuizzesComponent from "./userQuizzesComponent";
import UserFavoritesComponent from "./userFavoritesComponent";
import UserResultsComponent from "./userResultsComponent";
import UserQuizList from "./userQuizList";
import { PanelHeader } from "./userPanel";
import styles from "../../styles/pages/profile.module.scss";

const TABS = [
  { key: "my-quizzes", label: "My quizzes", icon: <MdOutlineQuiz aria-hidden="true" /> },
  { key: "favorites", label: "Favorites", icon: <MdFavoriteBorder aria-hidden="true" /> },
  { key: "my-results", label: "My results", icon: <MdInsights aria-hidden="true" /> },
  { key: "drafts", label: "Drafts", icon: <MdOutlineEditNote aria-hidden="true" /> },
];

const UserCardInfo = () => {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const activeIndex = Math.max(
    0,
    TABS.findIndex((tab) => tab.key === activeKey)
  );
  const indicatorStyle = {
    "--tab-index": activeIndex,
    "--tab-col-sm": activeIndex % 2,
    "--tab-row-sm": Math.floor(activeIndex / 2),
  } as CSSProperties;

  return (
    <Tab.Container
      id="user-card"
      activeKey={activeKey}
      onSelect={(key) => key && setActiveKey(key)}
    >
      <section className={styles.tabsPanel} aria-label="Your quizzes">
        <Nav variant="pills" className={styles.tabs} style={indicatorStyle}>
          <span className={styles.tabIndicator} aria-hidden="true" />
          {TABS.map(({ key, label, icon }) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={key}>
                {icon}
                {label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="my-quizzes">
            <UserQuizzesComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="favorites">
            <UserFavoritesComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="my-results">
            <UserResultsComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="drafts">
            <PanelHeader title="Drafts" subtitle="Unpublished quizzes you can keep editing" />
            <UserQuizList status="draft" />
          </Tab.Pane>
        </Tab.Content>
      </section>
    </Tab.Container>
  );
};

export default UserCardInfo;
