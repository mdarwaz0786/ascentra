import { BsShare } from "react-icons/bs";

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

        <h5 className="fw-bold">
          {title}
        </h5>

        <p className="text-muted small flex-grow-1">
          {description}
        </p>

        <hr />

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center">

          <button
            className="btn px-4 rounded-pill"
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

export default EventCard;
