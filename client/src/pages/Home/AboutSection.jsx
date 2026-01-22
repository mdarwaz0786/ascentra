import aboutImg from "../../assets/about.jpg";

const AboutSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT IMAGE */}
          <div className="col-lg-6">
            <img
              src={aboutImg}
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">About Us</h2>

            <p className="text-secondary fs-5 mb-4">
              We deliver comprehensive solutions to ensure your
              university’s success, from establishing in-country
              representation and driving strategic market development
              to executing on-the-ground initiatives and streamlining
              admissions support. Acting as an integrated extension
              of your team, we manage local operations with precision
              and care, underpinned by deep expertise and understanding
              of the South Asia region.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
