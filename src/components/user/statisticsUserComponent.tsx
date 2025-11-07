import StarComponent from "./starComponent";
import UserAboutComponent from "./userAboutComponent";

const StatisticsUserComponent = () => {
  return (
    <div className="pt-3">
      <h5 className="mb-4  text-center">My statistics</h5>
      <StarComponent />
      <UserAboutComponent />
    </div>
  );
};

export default StatisticsUserComponent;
