import { BsCalendar3 } from "react-icons/bs";

const MediaCard = ({
  image,
  dateTime,
  source,
  title,
  description,
  onReadMore,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">

      {/* Image */}
      <img
        src={image}
        className="card-img-top rounded-top-4"
        style={{ height: "200px", objectFit: "cover" }}
        alt={title}
      />

      {/* Body */}
      <div className="card-body">

        {/* Date */}
        <div className="d-flex align-items-center text-muted small mb-3">
          <BsCalendar3 className="me-2" />
          {dateTime}
        </div>

        {/* Source */}
        <h4 className="fw-medium mb-3">
          {source}
        </h4>

        {/* Title */}
        <h5 className="fw-bold mb-2">
          {title}
        </h5>

        {/* Description */}
        <p className="text-muted small">
          {description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>

        <hr />

        {/* Button */}
        <button
          className="btn rounded-pill px-4"
          onClick={onReadMore}
          style={{ background: "#333", color: "#fff" }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
