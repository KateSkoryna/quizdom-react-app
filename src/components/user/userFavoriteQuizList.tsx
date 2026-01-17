import { useState, useEffect } from "react";
import { Accordion, Container, Button } from "react-bootstrap";
import UserQuizListItem from "./userQuizItem";
import Loader from "../common/loader";
import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import styles from "../../styles/components/userResults.module.scss";

const QUIZZES_PER_PAGE = 6;

const UserFavoriteQuizList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { favorites, isLoading, getFavorites } = useFavoritesStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentUser) {
      getFavorites();
    }
  }, [currentUser, getFavorites]);

  if (isLoading) {
    return <Loader />;
  }

  if (favorites && favorites.length > 0) {
    const total = favorites.length;
    const totalPages = Math.ceil(total / QUIZZES_PER_PAGE);
    const startIndex = (currentPage - 1) * QUIZZES_PER_PAGE;
    const endIndex = startIndex + QUIZZES_PER_PAGE;
    const paginatedFavorites = favorites.slice(startIndex, endIndex);

    const handlePrevPage = () => {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    return (
      <div className="d-flex flex-column h-100">
        <div className="flex-grow-0">
          <Accordion defaultActiveKey="0" flush>
            {paginatedFavorites.map((quiz, index) => {
              return <UserQuizListItem key={quiz.id} quiz={quiz} eventKey={index.toString()} />;
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

  return (
    <Container className={styles.emptyState}>
      <p>You haven&apos;t favorited any quizzes yet. Explore quizzes and add them to your favorites!</p>
    </Container>
  );
};

export default UserFavoriteQuizList;
