import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating = 0, numReviews, interactive = false, onRatingChange }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (interactive) {
      stars.push(
        <FaStar
          key={i}
          className={`cursor-pointer ${i <= rating ? "text-warning" : "text-muted"}`}
          style={{ cursor: "pointer", fontSize: "1.4rem", marginRight: "4px" }}
          onClick={() => onRatingChange && onRatingChange(i)}
        />
      );
    } else {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
  }

  return (
    <div className="d-inline-flex align-items-center gap-1 rating-stars">
      <div className="d-flex text-warning">{stars}</div>
      {numReviews !== undefined && (
        <span className="text-muted small ms-1">({numReviews.toLocaleString()})</span>
      )}
    </div>
  );
};

export default RatingStars;
