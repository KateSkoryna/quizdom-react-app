import { AddQuizComponent } from "../AddQuizComponent/AddQuizComponent";
import { UserQuizList } from "../UserQuizList/UserQuizList";
import styles from "./UserQuizesComponent.module.css";

export const UserQuizesComponent = () => {
  return (
    <div className={styles.container}>
      <h5 className="mb-3 text-center">My Quizes</h5>
      <AddQuizComponent />
      <UserQuizList />
    </div>
  );
};
