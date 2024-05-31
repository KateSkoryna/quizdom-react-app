import { Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import StarComponent from "../StarComponent/StarComponent";
import { UserAboutComponent } from "../UserAboutComponent/UserAboutComponent";

export const StatisticsUserComponent = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div>
      <Container>
        <h1>Statistics</h1>
        <StarComponent rating={currentUser?.avarageScore || 0} />
        <UserAboutComponent info={currentUser?.about || ""} />
      </Container>
    </div>
  );
};
