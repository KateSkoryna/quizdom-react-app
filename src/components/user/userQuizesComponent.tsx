import AddQuizComponent from "../quiz/addQuizComponent";
import styles from "../../styles/components/userQuiz.module.scss";

const UserQuizesComponent = () => {
  return (
    <div className={styles.container}>
      <AddQuizComponent />
    </div>
  );
};

export default UserQuizesComponent;
