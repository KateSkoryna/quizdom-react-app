import { Card } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { StatisticsUserComponent } from "../StatisticsUserComponent/StatisticsUserComponent";
import { UserQuizesComponent } from "../UserQuizesComponent/UserQuizesComponent";
import { UserFavoritesComponent } from "../UserFavoritesComponent/UserFavoritesComponent";

export const UserCardInfo = () => {
  return (
    <Card className="flex-grow-1">
      <Tabs
        defaultActiveKey="statistics"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="statistics" title="Statistics">
          <StatisticsUserComponent />
        </Tab>
        <Tab eventKey="my-quizes" title="My Quizes">
          <UserQuizesComponent />
        </Tab>
        <Tab eventKey="favorites" title="Favorites">
          <UserFavoritesComponent />
        </Tab>
      </Tabs>
    </Card>
  );
};
