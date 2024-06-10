import styles from "./StarComponent.module.css";
function StarComponent({ rating }: { rating: number }) {
  return (
    <div>
      <h5 className="mb-1">Rating: {rating}</h5>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
        return (
          <span
            key={star}
            className={rating >= star ? styles.starRating : styles.starZero}
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
