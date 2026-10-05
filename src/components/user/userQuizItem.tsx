import type { CSSProperties } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { MdEdit, MdHelpOutline } from "react-icons/md";
import { UserQuiz } from "../../types";
import { useAuthStore } from "../../store/authStore";
import DeleteQuizComponent from "../quiz/deleteQuizComponent";
import QuizModal from "../modal/quizModal";
import { QUIZ_LEVEL_CONFIG } from "../../const/const";
import styles from "../../styles/pages/profile.module.scss";

const UserQuizItem = ({ quiz, isDraft }: { quiz: UserQuiz; isDraft?: boolean }) => {
  const { title, description, category, complexity, questions, authorId, authorName, publishedAt } =
    quiz;
  const currentUser = useAuthStore((state) => state.currentUser);
  const [showEditModal, setShowEditModal] = useState(false);

  const isOwner = currentUser?.id === authorId;
  const level = QUIZ_LEVEL_CONFIG[complexity];
  const localizedDate = dayjs(publishedAt).format("DD MMM YYYY");
  const levelStyle = { "--level-color": level?.color } as CSSProperties;

  return (
    <li className={styles.quizRow} style={levelStyle}>
      <span className={styles.rowAccent} aria-hidden="true" />
      <div className={styles.rowMain}>
        <h3 className={styles.rowTitle}>{title}</h3>
        {description && <p className={styles.rowDescription}>{description}</p>}
        <div className={styles.meta}>
          <span className={styles.pill}>{category}</span>
          <span className={styles.levelPill}>
            {level?.icon && <img src={level.icon} alt="" aria-hidden="true" />}
            {level?.name || complexity}
          </span>
          <span className={styles.pill}>
            <MdHelpOutline aria-hidden="true" />
            {questions.length} questions
          </span>
          <span>
            {isDraft ? "Saved" : "Published"} {localizedDate}
            {!isOwner && ` · by ${authorName}`}
          </span>
        </div>
      </div>
      {isOwner && (
        <div className={styles.rowActions}>
          {isDraft && (
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className={styles.iconButton}
              aria-label={`Edit ${title}`}
            >
              <MdEdit aria-hidden="true" />
            </button>
          )}
          <DeleteQuizComponent quizId={quiz.id} quizTitle={title} />
        </div>
      )}
      {showEditModal && (
        <QuizModal
          showModal={showEditModal}
          handleCloseModal={() => setShowEditModal(false)}
          existingQuiz={quiz}
        />
      )}
    </li>
  );
};

export default UserQuizItem;
