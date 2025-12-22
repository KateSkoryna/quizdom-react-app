import { MdHelpOutline } from "react-icons/md";
import styles from "../../../styles/components/quizCard.module.scss";

type QuizStatsProps = {
  rating: number;
  authorName: string;
  publishedAt: string;
  currentUser: boolean;
  questionsCount: number;
};

const QuizStats = ({
  rating,
  authorName,
  publishedAt,
  currentUser,
  questionsCount,
}: QuizStatsProps) => {
  const displayAuthor = currentUser ? authorName : "Someone you know";

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.publishedInfo}>
      <p className={styles.author}>{`Created by ${displayAuthor} • ${publishedAt}`}</p>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.rating}>{renderStars(Math.round(rating))}</span>
          <span className={styles.ratingValue}>
            {rating % 1 === 0 ? rating.toFixed(0) : rating.toFixed(1)}
          </span>
        </div>
        <div className={styles.statItem}>
          <MdHelpOutline className={styles.statIcon} />
          <span className={styles.statValue}>{questionsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizStats;
