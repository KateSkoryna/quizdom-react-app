import AddQuizComponent from "../quiz/addQuizComponent";
import UserQuizSegment from "./userQuizSegment";
import styles from "../../styles/components/userQuize.module.scss";

const UserQuizesComponent = () => {
  return (
    <div className={styles.container}>
      <h5 className="mb-3 text-center">My Quizes</h5>
      <AddQuizComponent />
      <UserQuizSegment />
    </div>
  );
};

export default UserQuizesComponent;
