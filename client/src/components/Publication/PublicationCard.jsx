import { BsShare, BsCalendar3 } from "react-icons/bs";

const PublicationCard = ({
  image,
  title,
  dateTime,
  description,
  onReadMore,
  onShare,
  tags,
}) => {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4">

      {/* Image */}
      <img
        src={image}
        className="card-img-top rounded-top-4"
        alt={title}
      />

      {/* Body */}
      <div className="card-body d-flex flex-column">

        {/* Date */}
        <div className="d-flex align-items-center text-muted small mb-3">
          <BsCalendar3 className="me-2" />
          {dateTime}
        </div>

        <h5 className="fw-bold">
          {title}
        </h5>

        {/* Description */}
        <p className="text-muted small">
          {description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>

        <p>Tags: {tags}</p>

        <hr />

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center">

          <button
            className="btn rounded-pill px-4"
            onClick={onReadMore}
            style={{ background: "#333", color: "#fff" }}
          >
            Read More
          </button>

          <button
            className="btn btn-light border rounded-circle"
            onClick={onShare}
          >
            <BsShare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
