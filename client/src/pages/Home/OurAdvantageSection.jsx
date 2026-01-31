const OurAdvantageSection = () => {
  return (
    <div className="py-5" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="row align-items-center justify-content-center g-5">

          {/* LEFT IMAGE */}
          <div className="col-lg-5 mt-5">
            <img
              src="/aboutus/OURADVANTAGE.png"
              alt="About Us"
              className="img-fluid w-100 h-100 rounded"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-semibold mb-4">OUR ADVANTAGE</h4>

            <p className="fs-5 mb-4">
              Founded on enduring values of integrity and excellence, ACE ASCENTRA specialises in helping universities, corporate enterprises, and education institutions enter, establish, and scale successfully across India, South Asia, and the UAE.
            </p>

            <p className="fs-5 mb-4">
              We go beyond advisory. We execute with precision, leveraging strong regional networks and proven operational models to deliver measurable outcomes—whether that is student recruitment, partnerships, brand visibility, or institutional growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAdvantageSection;
