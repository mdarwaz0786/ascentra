import { BsShare, BsCalendar3 } from "react-icons/bs";

const BlogCard = ({
  image,
  dateTime,
  title,
  description,
  onReadMore,
  onShare,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="card-img-top rounded-top-4"
        style={{ height: "210px", objectFit: "cover" }}
      />

      {/* Body */}
      <div className="card-body">

        {/* Date */}
        <div className="d-flex align-items-center text-muted small mb-2">
          <BsCalendar3 className="me-2" />
          {dateTime}
        </div>

        {/* Title */}
        <h5 className="fw-bold">
          {title}
        </h5>

        {/* Description */}
        <p className="text-muted small">
          {description?.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>

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

export default BlogCard;
