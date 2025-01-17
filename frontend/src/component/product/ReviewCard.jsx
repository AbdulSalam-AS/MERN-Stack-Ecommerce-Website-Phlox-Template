import { Rating } from "@mui/material";
import profilePng from "/src/images/Profile.png";
function ReviewCard({ review }) {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="review">
        <div>
          <img src={profilePng} alt="User" />
          <div>
            <p className="fs-poppins fs-100">
              <span className="fs-montserrat bold-800">{review.name}</span> - {String(review.date).substr(0, 10)}
            </p>
            <p className="fs-poppins">{review.comment}</p>
          </div>
        </div>
        <div>
          <div className="ratings">
            <Rating {...options} />
          </div>
        </div>
      </div>
  );
}

export default ReviewCard;
