const ServiceHeader = ({ title, subtitle }) => {
  return (
    <div className="container text-center">

      <h2 className="fw-semibold mb-3">
        {title}
      </h2>

      <p className="text-muted mx-auto lh-lg">
        {subtitle}
      </p>
    </div>
  );
};

export default ServiceHeader;
