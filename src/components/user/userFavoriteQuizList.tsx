import { useState, useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { PanelEmpty, PanelPagination } from "./userPanel";
import styles from "../../styles/pages/profile.module.scss";

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

  if (!favorites || favorites.length === 0) {
    return (
      <PanelEmpty icon={<MdFavoriteBorder />}>
        You haven&apos;t favorited any quizzes yet. Explore quizzes and add them to your favorites!
      </PanelEmpty>
    );
  }

  const totalPages = Math.ceil(favorites.length / QUIZZES_PER_PAGE);
  const startIndex = (currentPage - 1) * QUIZZES_PER_PAGE;
  const paginatedFavorites = favorites.slice(startIndex, startIndex + QUIZZES_PER_PAGE);

  return (
    <>
      <ul className={styles.list}>
        {paginatedFavorites.map((quiz) => (
          <UserQuizItem key={quiz.id} quiz={quiz} />
        ))}
      </ul>
      <PanelPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </>
  );
};

export default UserFavoriteQuizList;
