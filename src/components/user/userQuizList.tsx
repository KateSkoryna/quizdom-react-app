import { Accordion, Container } from "react-bootstrap";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { Status } from "../modal/quizModal";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/components/userResults.module.scss";
import { useQuizzesByUser } from "../../hooks/useQuizzes";

const UserQuizList = ({ status, title }: { status: Status; title: string }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { data: quizzes = [], isLoading } = useQuizzesByUser(status, currentUser?.id);

  if (isLoading) {
    return <Loader />;
  }

  if (quizzes && quizzes.length > 0) {
    return (
      <div className="pt-3 text-center">
        <h5 className="mb-3 text-center">{title}</h5>
        <Accordion defaultActiveKey="0" flush>
          {quizzes.map((quiz, index) => {
            return (
              <UserQuizItem
                key={quiz.id}
                quiz={quiz}
                eventKey={index.toString()}
                isDraft={status === "draft"}
              />
            );
          })}
        </Accordion>
      </div>
    );
  }

  // Empty state
  const emptyMessage =
    status === "draft"
      ? "You don't have any draft quizzes. Start creating a quiz and save it as a draft!"
      : "You haven't created any quizzes yet. Click 'Add Quiz' above to create your first quiz!";

  return (
    <Container className={styles.emptyState}>
      <p>{emptyMessage}</p>
    </Container>
  );
};

export default UserQuizList;
