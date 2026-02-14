const TestimonialCard = ({
  description,
  image,
  name,
  designation,
  index,
}) => {
  const isReverse = index % 2 !== 0;
  const bgColor = index % 2 !== 0 ? "#f5f5f5" : "#fff";
  const imageBgColor = index % 2 !== 0 ? "#ffffff" : "#f5f5f5";

  return (
    <div className="py-5" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <div
          className={`row g-5 ${isReverse ? "flex-lg-row-reverse" : ""}`}
        >
          {/* Image */}
          <div
            className="col-lg-5 text-center"
            style={{
              backgroundColor: imageBgColor,
            }}
          >
            <img
              src={image}
              alt={name}
              className="rounded-4"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content */}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-1">{name}</h4>
            <p className="text-muted mb-3">{designation}</p>
            <p className="fs-5 mb-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
