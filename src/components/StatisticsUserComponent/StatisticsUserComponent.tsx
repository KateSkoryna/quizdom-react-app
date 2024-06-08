import { useAuth } from "../../context/AuthContext";
import StarComponent from "../StarComponent/StarComponent";
import { UserAboutComponent } from "../UserAboutComponent/UserAboutComponent";

export const StatisticsUserComponent = () => {
  const { currentUser } = useAuth();
  return (
    <div className="pt-3">
      <h4 className="mb-4">My statistics:</h4>
      <StarComponent rating={currentUser?.avarageScore || 8} />
      <UserAboutComponent info={currentUser?.userInfo || ""} />
    </div>
  );
};
