const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="h-100 p-4 border border-1 border-dark rounded-4 bg-white">

      <div className="mb-3">
        <img
          src={icon}
          alt={title}
          className="img-fluid"
          style={{ width: "100px" }}
        />
      </div>

      <h4 className="fw-semibold mb-3">
        {title}
      </h4>

      <p className="text-dark small lh-lg mb-0">
        {description}
      </p>

    </div>
  );
};

export default ServiceCard;
