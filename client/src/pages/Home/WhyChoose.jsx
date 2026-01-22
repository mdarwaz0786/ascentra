import aboutImg from "../../assets/about.jpg";

const WhyChoose = () => {
  return (
    <section className="py-5" style={{ background: "#fff" }}>
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Why Choose Us</h2>

            <p className="text-secondary mb-4 fs-5">
              We bring deep regional expertise, strategic insight, and
              on-the-ground execution to help institutions succeed in
              complex international markets. Our tailored approach
              ensures precision, consistency, and measurable impact
              across every engagement.
            </p>

            <p className="text-secondary mb-0 fs-5">
              By acting as a true extension of your team, we deliver
              reliable representation, strong local partnerships, and
              sustainable growth outcomes that create long-term value.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6">
            <img
              src={aboutImg}
              alt="Why Choose Us"
              className="img-fluid rounded"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
