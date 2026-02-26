const AboutSection = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center g-5">
          {/* LEFT IMAGE */}
          <div className="col-lg-5">
            <img
              src="/aboutus/AboutUs.png"
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>
          {/* RIGHT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-semibold mb-4">ABOUT US</h4>

            <p className="fs-5 mb-3">
              ACE ASCENTRA Consulting is a strategic advisory and execution firm enabling global universities, education providers, and enterprises to establish and expand across India, South Asia, and the UAE.
            </p>

            <p className="fs-5 mb-3">
              We provide structured market entry and expansion solutions — from feasibility assessment and strategy design to on-ground implementation and ongoing performance oversight.
            </p>

            <p className="fs-5 mb-0">
              Operating as your in-country representative, we ensure institutional credibility, regulatory alignment, and operational stability from the outset. Our role is to help you enter new markets with clarity, structure, and controlled risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
