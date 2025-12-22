import styles from "../../styles/components/starRating.module.scss";

type StarRatingProps = {
  rating: number;
  maxStars?: number;
  size?: "small" | "medium" | "large";
};

const StarRating = ({ rating, maxStars = 5, size = "small" }: StarRatingProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      // Calculate fill percentage for this star (0-100)
      const fillPercentage = Math.max(0, Math.min(100, (rating - (i - 1)) * 100));

      stars.push(
        <span key={i} className={styles.starContainer}>
          <span className={styles.starEmpty}>★</span>
          <span
            className={styles.starFilled}
            style={{ width: `${fillPercentage}%` }}
          >
            ★
          </span>
        </span>
      );
    }
    return stars;
  };

  return (
    <span className={`${styles.rating} ${styles[size]}`}>
      {renderStars()}
    </span>
  );
};

export default StarRating;
