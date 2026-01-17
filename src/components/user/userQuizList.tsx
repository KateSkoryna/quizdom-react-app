import { useState } from "react";
import { Accordion, Container, Button } from "react-bootstrap";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { Status } from "../modal/quizModal";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/components/userResults.module.scss";
import { useQuizzesByUser } from "../../hooks/useQuizzes";

const QUIZZES_PER_PAGE = 6;

const UserQuizList = ({ status, title }: { status: Status; title: string }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * QUIZZES_PER_PAGE;
  const { data, isLoading } = useQuizzesByUser(status, currentUser?.id, QUIZZES_PER_PAGE, offset);

  if (isLoading) {
    return <Loader />;
  }

  const quizzes = data?.data || [];
  const total = data?.pagination?.total || 0;
  const totalPages = Math.ceil(total / QUIZZES_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (quizzes && quizzes.length > 0) {
    return (
      <div className="d-flex flex-column h-100">
        <div className="flex-grow-0">
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

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-auto py-3">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <span className="fw-semibold">
              {currentPage}/{totalPages}
            </span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </div>
        )}
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
