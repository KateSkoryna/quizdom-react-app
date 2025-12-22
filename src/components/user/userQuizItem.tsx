import Accordion from "react-bootstrap/Accordion";
import { UserQuiz } from "../../types";
import styles from "../../styles/components/userQuiz.module.scss";
import { useAuthStore } from "../../store/authStore";
import DeleteQuizComponent from "../quiz/deleteQuizComponent";
import { MdEdit } from "react-icons/md";
import dayjs from "dayjs";
import { useState } from "react";
import QuizModal from "../modal/quizModal";

const UserQuizItem = ({
  quiz,
  eventKey,
  isDraft,
}: {
  quiz: UserQuiz;
  eventKey: string;
  isDraft?: boolean;
}) => {
  const {
    title,
    authorId,
    authorName,
    publishedAt,
    ratingsCount: _ratingCount,
    likesCount: _likesCount,
    status: _status,
    id: _id,
    ...rest
  } = quiz;
  const currentUser = useAuthStore((state) => state.currentUser);
  const localizedDate = dayjs(publishedAt).format("DD/MM/YYYY");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className="text-start position-relative">
        {currentUser?.id === authorId && (
          <div className={styles.actionButtons}>
            {isDraft && (
              <button
                onClick={handleEditClick}
                className={styles.iconButton}
                aria-label="Edit quiz"
                type="button"
              >
                <MdEdit className={styles.icon} />
              </button>
            )}
            <DeleteQuizComponent />
          </div>
        )}

        {Object.entries(rest).map(([key, value]) => {
          let displayValue;

          if (Array.isArray(value)) {
            displayValue = value.length;
          } else if (typeof value === "string") {
            displayValue = value[0].toUpperCase() + value.slice(1);
          } else {
            displayValue = String(value);
          }

          return (
            <p key={key} className={styles.itemText}>
              {key[0].toUpperCase() + key.slice(1)}: {displayValue}
            </p>
          );
        })}

        <small className={styles.itemSmalltext}>
          {`Published at: ${localizedDate}${
            currentUser?.id === authorId ? "" : ` by ${authorName}`
          }`}
        </small>
      </Accordion.Body>
      {showEditModal && (
        <QuizModal
          showModal={showEditModal}
          handleCloseModal={handleCloseModal}
          existingQuiz={quiz}
        />
      )}
    </Accordion.Item>
  );
};

export default UserQuizItem;
