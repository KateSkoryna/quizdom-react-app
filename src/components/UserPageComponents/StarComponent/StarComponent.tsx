import { useAuth } from "../../../context/AuthContext";
import styles from "./StarComponent.module.css";
function StarComponent() {
  const { currentUser } = useAuth();

  const score: number = Number(currentUser?.avarageScore);

  return (
    <div>
      <h5 className="mb-1">Rating: {score || 0}/10</h5>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
        return (
          <span
            key={star}
            className={score >= star ? styles.starRating : styles.starZero}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default StarComponent;
