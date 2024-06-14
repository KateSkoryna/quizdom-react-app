import StarComponent from "../StarComponent/StarComponent";
import { UserAboutComponent } from "../UserAboutComponent/UserAboutComponent";

export const StatisticsUserComponent = () => {
  return (
    <div className="pt-3">
      <h5 className="mb-4  text-center">My statistics</h5>
      <StarComponent />
      <UserAboutComponent />
    </div>
  );
};
