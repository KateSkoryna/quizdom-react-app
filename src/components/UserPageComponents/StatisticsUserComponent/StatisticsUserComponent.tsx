import { useAuth } from "../../../context/AuthContext";
import StarComponent from "../StarComponent/StarComponent";
import { UserAboutComponent } from "../UserAboutComponent/UserAboutComponent";

export const StatisticsUserComponent = () => {
  const { currentUser } = useAuth();
  return (
    <div className="pt-3">
      <h5 className="mb-4  text-center">My statistics</h5>
      <StarComponent rating={currentUser?.avarageScore || 8} />
      <UserAboutComponent info={currentUser?.userInfo || ""} />
    </div>
  );
};
