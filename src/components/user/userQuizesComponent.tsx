import AddQuizComponent from "../quiz/addQuizComponent";
import UserQuizList from "../user/userQuizList";
import styles from "../../styles/components/userQuiz.module.scss";

const UserQuizesComponent = () => {
  return (
    <div className={styles.container}>
      <AddQuizComponent />
      <UserQuizList status="done" title="My Quizes" />
    </div>
  );
};

export default UserQuizesComponent;
