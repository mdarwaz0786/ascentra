const OurAdvantageSection = () => {
  return (
    <div className="py-5" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="row justify-content-center g-5">
          {/* LEFT IMAGE */}
          <div className="col-lg-5">
            <img
              src="/aboutus/OURADVANTAGE.png"
              alt="Our Advantage"
              className="img-fluid rounded"
            />
          </div>
          {/* RIGHT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-semibold mb-4">OUR ADVANTAGE</h4>

            <p className="fs-5 mb-3">
              Our strength lies in combining regional depth with international standards of governance and delivery.
            </p>

            <p className="fs-5 mb-3">
              With established networks across academia, industry, schools, government bodies, and recruitment ecosystems, we provide institutions with access that would otherwise take years to build.
            </p>

            <p className="fs-5 mb-3">
              We understand evolving policy landscapes — including reforms such as India’s National Education Policy 2020 — and translate them into actionable institutional opportunities
            </p>

            <p className="fs-5 mb-0">
              Beyond strategy, we embed ourselves operationally — acting as an extension of your team to deliver measurable progress in research collaborations, student mobility, brand positioning, and long-term institutional growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAdvantageSection;
