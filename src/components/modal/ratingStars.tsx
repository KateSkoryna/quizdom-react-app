import { useId, useState } from "react";
import styles from "../../styles/components/quizPlay.module.scss";

const MAX_STARS = 5;
const RATING_LABELS = [
  "Tap a star to rate",
  "Not for me",
  "Could be better",
  "Good",
  "Great",
  "Loved it!",
];
const STAR_PATH = "M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z";

type RatingStarsProps = {
  value: number;
  onChange: (value: number) => void;
};

const RatingStars = ({ value, onChange }: RatingStarsProps) => {
  const [hovered, setHovered] = useState(0);
  const gradientId = useId();
  const labelId = useId();
  const displayed = hovered || value;

  return (
    <div className={styles.ratingPanel}>
      <svg width="0" height="0" aria-hidden="true" focusable="false" className={styles.svgDefs}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb866" />
            <stop offset="35%" stopColor="#f7941d" />
            <stop offset="70%" stopColor="#ff8fb1" />
            <stop offset="100%" stopColor="#997ae7" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className={styles.starRow}
        role="group"
        aria-labelledby={labelId}
        onMouseLeave={() => setHovered(0)}
      >
        {Array.from({ length: MAX_STARS }, (_, index) => {
          const star = index + 1;
          const isFilled = star <= displayed;
          return (
            <button
              key={star}
              type="button"
              className={`${styles.star} ${isFilled ? styles.starFilled : ""} ${
                star === value ? styles.starSelected : ""
              }`}
              onClick={() => onChange(star === value ? 0 : star)}
              onMouseEnter={() => setHovered(star)}
              onFocus={() => setHovered(star)}
              onBlur={() => setHovered(0)}
              aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
              aria-pressed={star <= value}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d={STAR_PATH} fill={isFilled ? `url(#${gradientId})` : "none"} />
              </svg>
            </button>
          );
        })}
      </div>
      <p id={labelId} className={styles.ratingLabel} aria-live="polite">
        {RATING_LABELS[displayed]}
      </p>
    </div>
  );
};

export default RatingStars;
