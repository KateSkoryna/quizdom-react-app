import { AddQuizComponent } from "../quiz/AddQuizComponent";
import { UserQuizSegment } from "./UserQuizSegment";
import styles from "../../styles/components/UserQuizesComponent.module.scss";

export const UserQuizesComponent = () => {
  return (
    <div className={styles.container}>
      <h5 className="mb-3 text-center">My Quizes</h5>
      <AddQuizComponent />
      <UserQuizSegment />
    </div>
  );
};
