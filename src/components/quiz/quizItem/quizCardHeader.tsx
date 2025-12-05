import QuizNoUserModal from "../../modal/quizNoUserModal";
import styles from "../../../styles/components/quizCard.module.scss";

type QuizCardHeaderProps = {
  title: string;
  id: string;
};

const QuizCardHeader = ({ title, id }: QuizCardHeaderProps) => {
  return (
    <div className={styles.cardHeader}>
      <h3 className={styles.title}>{title}</h3>
      <QuizNoUserModal id={id} />
    </div>
  );
};

export default QuizCardHeader;
