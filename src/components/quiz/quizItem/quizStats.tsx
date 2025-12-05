import HeartIcon from "../../icons/heartIcon";
import CommentIcon from "../../icons/commentIcon";
import styles from "../../../styles/components/quizCard.module.scss";

type QuizStatsProps = {
  rating: number;
  likesCount: number;
  commentsCount: number;
  authorName: string;
  publishedAt: string;
  currentUser: boolean;
};

const QuizStats = ({
  rating,
  likesCount,
  commentsCount,
  authorName,
  publishedAt,
  currentUser,
}: QuizStatsProps) => {
  const displayAuthor = currentUser ? authorName : "Someone you know";

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.cardMeta}>
      <div className={styles.publishedInfo}>
        <p
          className={styles.author}
        >{`Published by ${displayAuthor} • ${publishedAt}`}</p>
      </div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.rating}>
            {renderStars(Math.round(rating))}
          </span>
          {rating > 0 && (
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          )}
        </div>
        <div className={styles.statItem}>
          <HeartIcon className={styles.statIcon} />
          <span className={styles.statValue}>{likesCount}</span>
        </div>
        <div className={styles.statItem}>
          <CommentIcon className={styles.statIcon} />
          <span className={styles.statValue}>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizStats;
