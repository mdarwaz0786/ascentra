const OurAdvantageSection = () => {
  return (
    <div className="py-5" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="row justify-content-center g-5">

          {/* LEFT IMAGE */}
          <div className="col-lg-5 mt-5">
            <img
              src="/aboutus/OURADVANTAGE.png"
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-semibold mb-4">OUR ADVANTAGE</h4>

            <p className="fs-5 mb-4">
              our advantage - integrated the message -Founded on enduring values of integrity, discipline, and excellence, ACE ASCENTRA supports universities, education providers, and corporate organisations in entering, establishing, and scaling successfully across India, South Asia, and the UAE. We combine deep regional insight with global perspective to help institutions navigate complex markets with clarity and confidence.
            </p>

            <p className="fs-5 mb-4">
              As higher education becomes increasingly globalised and policy frameworks such as India’s National Education Policy 2020 drive international engagement, institutions are seeking credible partners who can translate ambition into structured outcomes. ACE ASCENTRA works at this intersection—enabling international collaborations, research partnerships, student mobility, and meaningful institutional engagement aligned with global benchmarks.
            </p>

            <p className="fs-5 mb-4">
              We go beyond advisory to deliver execution. Acting as an extension of your team, we leverage established networks, proven operational models, and in-market expertise to deliver measurable outcomes across student recruitment, strategic partnerships, brand positioning, and long-term institutional growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAdvantageSection;
