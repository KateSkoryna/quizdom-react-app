function StarComponent({ rating }: { rating: number }) {
  return (
    <div>
      <h5>Rating: {rating}</h5>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
        return (
          <span
            key={star}
            className="start"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `35px`,
            }}
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
