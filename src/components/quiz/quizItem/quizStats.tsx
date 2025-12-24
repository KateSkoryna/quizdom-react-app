import { MdHelpOutline, MdFavorite } from "react-icons/md";
import styles from "../../../styles/components/quizCard.module.scss";
import StarRating from "../../common/starRating";

type QuizStatsProps = {
  rating: number;
  authorName: string;
  publishedAt: string;
  currentUser: boolean;
  questionsCount: number;
  likesCount?: number;
};

const QuizStats = ({
  rating,
  authorName,
  publishedAt,
  currentUser,
  questionsCount,
  likesCount = 0,
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
        <div className={styles.statItem}>
          <MdFavorite className={styles.statIcon} style={{ color: "#f7941d" }} />
          <span className={styles.statValue}>{likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizStats;
