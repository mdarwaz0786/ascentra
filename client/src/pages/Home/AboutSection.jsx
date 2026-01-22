import aboutImg from "../../assets/about.png";

const AboutSection = () => {
  return (
    <section
      className="py-5"
      style={{
        backgroundImage: `url(${aboutImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">

            {/* LEFT EMPTY COLUMN (IMAGE SPACE FEEL) */}
            <div className="col-lg-6"></div>

            {/* RIGHT CONTENT */}
            <div className="col-lg-6 text-black">
              <h2 className="fw-bold mb-4">About Us</h2>

              <p className="fs-5 mb-4">
                ACE ASCENTRA Consulting is a strategic advisory and execution firm
                supporting global universities, education providers, and
                enterprises seeking to establish and grow their presence in
                India, South Asia, and the UAE.
              </p>

              <p className="fs-5 mb-4">
                We deliver end-to-end market solutions—from research and strategy
                to on-ground execution and performance management. Our work is
                defined by deep local insight, rigorous planning, and disciplined
                delivery.
              </p>

              <p className="fs-5 mb-4">
                From day one, we operate as your trusted in-market partner,
                providing advisory, liaison, compliance, and operational support
                to ensure a strong, sustainable foundation.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
