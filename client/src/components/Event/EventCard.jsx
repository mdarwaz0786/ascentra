const EventCard = ({
  image,
  title,
  description,
  onReadMore,
  onShare,
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

        <h5 className="fw-bold text-danger">
          {title}
        </h5>

        <p className="text-muted small flex-grow-1">
          {description}
        </p>

        <hr />

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center">

          <button
            className="btn btn-danger px-4 rounded-pill"
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

export default EventCard;
