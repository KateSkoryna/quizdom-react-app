import { useAuth } from "../../../context/AuthContext";
import styles from "./StarComponent.module.css";
function StarComponent() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h5 className="mb-1">Rating: {currentUser?.avarageScore || 8}</h5>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
        return (
          <span
            key={star}
            className={
              currentUser?.avarageScore || 8 >= star
                ? styles.starRating
                : styles.starZero
            }
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
