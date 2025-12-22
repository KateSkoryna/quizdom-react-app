import { MdHelpOutline } from "react-icons/md";
import styles from "../../../styles/components/quizCard.module.scss";
import StarRating from "../../common/starRating";

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

  return (
    <div className={styles.publishedInfo}>
      <p className={styles.author}>{`Created by ${displayAuthor} • ${publishedAt}`}</p>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <StarRating rating={rating} />
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
