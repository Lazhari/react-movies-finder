import React from "react";

const ReviewsList = ({ reviews }) => {
  return (
    <div>
      {reviews.map(review => {
        return (
          <blockquote
            className="blockquote"
            style={{ borderBottom: "1px dashed rgba(0,0,0,.125)" }}
            key={review.id}
          >
            <p className="text-justify lead" style={{ fontSize: 14 }}>
              {review.content}.
            </p>
            <footer className="blockquote-footer" style={{ padding: 5 }}>
              {review.author}
            </footer>
          </blockquote>
        );
      })}
    </div>
  );
};

export default ReviewsList;
