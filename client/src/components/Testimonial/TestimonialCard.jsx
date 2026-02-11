import { useState } from "react";

const TestimonialCard = ({
  description,
  image,
  name,
  designation,
  organization,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const shortText =
    description.length > 400
      ? description.substring(0, 400) + "..."
      : description;

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column">
      {/* Top Content */}
      <div>
        <p className="text-muted mb-2" style={{ fontSize: "18px" }}>
          {isExpanded ? description : shortText}
        </p>
        {description.length > 180 && (
          <button
            className="btn btn-link text-danger fw-semibold p-0"
            onClick={toggleDescription}
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>

      {/* Bottom Section */}
      <div className="d-flex align-items-center gap-3 mt-auto pt-3">
        <img
          src={image}
          alt={name}
          className="rounded-circle"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
        <div>
          <h5 className="fw-semibold mb-1">{name}</h5>
          <p className="mb-1">{designation}</p>
          <p className="mb-0">{organization}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
