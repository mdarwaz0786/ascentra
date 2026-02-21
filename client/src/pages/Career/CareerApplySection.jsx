import { useState, useEffect } from "react";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const CareerApplySection = () => {
  const { postData, response, postError } = useCreate(apis.resume.create);
  const { errors, validate } = useFormValidation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    coverLetter: "",
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name == "resume") {
      setFormData((prev) => ({
        ...prev,
        resume: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(formData, {
      name: { required: true, label: "Name" },
      email: { required: true, label: "Email" },
      mobile: { required: true, label: "Mobile" },
      position: { required: true, label: "Position" },
      resume: { required: true, label: "Resume" },
    });

    if (!isValid) return;

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("mobile", formData.mobile);
    payload.append("position", formData.position);
    payload.append("coverLetter", formData.coverLetter);
    payload.append("resume", formData.resume);

    setIsSubmitting(true);
    await postData(payload, "", true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        position: "",
        coverLetter: "",
        resume: null,
      });
    } else if (postError) {
      toast.error(postError);
    }
  }, [response, postError]);

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-semibold">Apply for a Position</h2>
          <p className="mx-auto">
            Join our team and help us shape the future. Fill out the form below
            and submit your application.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">

                  {/* Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <small className="text-danger">{errors.name}</small>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Mobile</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && (
                      <small className="text-danger">{errors.mobile}</small>
                    )}
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
                    />
                    {errors.position && (
                      <small className="text-danger">{errors.position}</small>
                    )}
                  </div>

                  {/* Resume */}
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="resume"
                      accept=".pdf,.doc,.doc,.docx"
                      onChange={handleChange}
                    />
                    {errors.resume && (
                      <small className="text-danger">{errors.resume}</small>
                    )}
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

                  {/* Submit */}
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn px-5 py-2 fw-semibold rounded-pill"
                      style={{ background: "#333", color: "#fff" }}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Application"}
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
