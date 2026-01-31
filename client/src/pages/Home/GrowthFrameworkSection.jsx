const GrowthFrameworkSection = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row align-items-center justify-content-center g-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-semibold mb-4">OUR GROWTH FRAMEWORK</h4>

            <p className="fs-5 mb-4">
              Our approach is pragmatic, structured, and results driven.
            </p>

            <p className="fs-5 mb-4">
              We combine traditional consulting principles—accountability, rigour, and execution discipline—with forward-looking market intelligence. Each strategy is carefully tailored, continuously reviewed, and adapted to changing regulatory, institutional, and competitive conditions.
            </p>

            <p className="fs-5 mb-4">
              We believe successful international expansion is built steadily: informed decisions, strong local relationships, and consistent on-ground presence. That philosophy guides every assignment we undertake.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-5 mt-0">
            <img
              src="/aboutus/OURGROWTHFRAMEWORK.png"
              alt="About Us"
              className="img-fluid w-100 h-100 rounded"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default GrowthFrameworkSection;
