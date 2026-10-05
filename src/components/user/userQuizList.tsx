import { useState } from "react";
import { MdOutlineEditNote, MdOutlineQuiz } from "react-icons/md";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { Status } from "../modal/quizModal";
import { useAuthStore } from "../../store/authStore";
import { useQuizzesByUser } from "../../hooks/useQuizzes";
import { PanelEmpty, PanelPagination } from "./userPanel";
import styles from "../../styles/pages/profile.module.scss";

const QUIZZES_PER_PAGE = 6;

const UserQuizList = ({ status }: { status: Status }) => {
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
  const isDraft = status === "draft";

  if (quizzes.length === 0) {
    return (
      <PanelEmpty icon={isDraft ? <MdOutlineEditNote /> : <MdOutlineQuiz />}>
        {isDraft
          ? "You don't have any draft quizzes. Start creating a quiz and save it as a draft!"
          : "You haven't created any quizzes yet. Click “Create quiz” to make your first one!"}
      </PanelEmpty>
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {quizzes.map((quiz) => (
          <UserQuizItem key={quiz.id} quiz={quiz} isDraft={isDraft} />
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

export default UserQuizList;
