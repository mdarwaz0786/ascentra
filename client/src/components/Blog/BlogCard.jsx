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
          <i className="bi bi-calendar3 me-2"></i>
          {dateTime}
        </div>

        {/* Title */}
        <h5 className="fw-bold text-danger">
          {title}
        </h5>

        {/* Description */}
        <p className="text-muted small">
          {description}
        </p>

        <hr />

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center">

          <button
            className="btn btn-danger rounded-pill px-4"
            onClick={onReadMore}
          >
            Read More
          </button>

          <button
            className="btn btn-light border rounded-circle"
            onClick={onShare}
          >
            <i className="bi bi-share"></i>
          </button>

        </div>
      </div>
    </div>
  );
};

export default BlogCard;
