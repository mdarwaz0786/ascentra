const AboutSection = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row align-items-center justify-content-center g-5">

          {/* LEFT IMAGE */}
          <div className="col-lg-5 mt-3">
            <img
              src="/aboutus/AboutUs.png"
              alt="About Us"
              className="img-fluid w-100 h-100 rounded"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-semibold mb-4">ABOUT US</h4>

            <p className="fs-5 mb-4">
              ACE ASCENTRA Consulting is a strategic advisory and execution firm
              supporting global universities, education providers, and
              enterprises seeking to establish and grow their presence in India,
              South Asia, and the UAE.
            </p>

            <p className="fs-5 mb-4">
              We deliver end-to-end market solutions—from research and strategy
              to on-ground execution and performance management. Our work is
              defined by deep local insight, rigorous planning, and disciplined
              delivery.
            </p>

            <p className="fs-5 mb-4">
              From day one, we operate as your trusted in country,
              providing advisory, liaison, compliance, and operational support
              to ensure a strong, sustainable foundation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
