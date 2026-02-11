import { useState } from "react";

const CareerApplySection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Application Submitted!");
  };

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-semibold">Apply for a Position</h2>
          <p className="mx-auto">
            Join our team and help us shape the future. Fill out the form below
            and submit your application.
          </p>
        </div>

        {/* Form Card */}
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Full Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Position */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Position Applied For
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Cover Letter */}
                  <div className="col-12 mb-4">
                    <label className="form-label fw-semibold">
                      Cover Letter
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn px-5 py-2 fw-semibold rounded-pill"
                      style={{ background: "#333", color: "#fff" }}
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerApplySection;
