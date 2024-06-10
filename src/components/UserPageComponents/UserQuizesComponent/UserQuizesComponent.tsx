import { AddQuizComponent } from "../../MainQuizPageComponents/AddQuizComponent/AddQuizComponent";
import { UserQuizSegment } from "../UserQuizSegment/UserQuizSegment";
import styles from "./UserQuizesComponent.module.css";

export const UserQuizesComponent = () => {
  return (
    <div className={styles.container}>
      <h5 className="mb-3 text-center">My Quizes</h5>
      <AddQuizComponent />
      <UserQuizSegment />
    </div>
  );
};
