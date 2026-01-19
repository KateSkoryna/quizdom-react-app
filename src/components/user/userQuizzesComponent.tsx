import AddQuizComponent from "../quiz/addQuizComponent";
import UserQuizList from "./userQuizList";
import styles from "../../styles/components/userQuiz.module.scss";

const UserQuizzesComponent = () => {
  return (
    <div className={`${styles.container} d-flex flex-column h-100`}>
      <AddQuizComponent />
      <UserQuizList status="done" />
    </div>
  );
};

export default UserQuizzesComponent;
