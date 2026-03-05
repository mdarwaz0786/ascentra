import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import { useEffect, useState } from "react";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import apis from "../../apis/apis";
import { toast } from "react-toastify";

const ContactusPage = () => {
  const { postData, response, postError } = useCreate(apis.contact.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      name: { required: true, label: "Name" },
      mobile: { required: true, label: "Mobile" },
      message: { required: true, label: "Message" },
    });

    if (!isValid) return;

    setIsSubmitting(true);
    await postData(form);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    } else if (postError) {
      toast.error(postError);
    }
  }, [response, postError]);

  return (
    <>
      <Navbar />
      <Hero src="/banner/Contact.png" />
      <div className="container-fluid p-0">
        {/* ================= TOP INFO SECTION ================= */}
        <div className="bg-light py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Get in Touch</h2>
              <p className="text-muted mb-0">
                We’d love to hear from you. Reach us anytime.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0 text-center p-4">
                  <div className="mb-3">
                    <span className="text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60, background: "#00578c" }}>
                      <FaMapMarkerAlt size={26} />
                    </span>
                  </div>
                  <h5 className="fw-semibold">Our Address</h5>
                  <p className="text-muted mb-0">
                    A-143, Upper Ground Floor, Neeti Bagh, New Delhi-110049, India <br />
                    T: +91-11-40522433/40536792 <br />
                    E: contact@aceascentra.com <br />
                    Mobile: +91-9650050798
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0 text-center p-4">
                  <div className="mb-3">
                    <span className="text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60, background: "#00578c" }}>
                      <FaEnvelope size={26} />
                    </span>
                  </div>
                  <h5 className="fw-semibold">Email Us</h5>
                  <p className="text-muted mb-0">contact@aceascentra.com</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0 text-center p-4">
                  <div className="mb-3">
                    <span className="text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60, background: "#00578c" }}>
                      <FaPhoneAlt size={24} />
                    </span>
                  </div>
                  <h5 className="fw-semibold">Call Us</h5>
                  <p className="text-muted mb-0">+91-9650050798</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTACT FORM SECTION ================= */}
        <div className="py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h3 className="fw-bold mb-3">Send Us a Message</h3>
                <p className="text-muted">
                  Have a question or need help? Fill out the form and our team
                  will get back to you shortly.
                </p>
              </div>

              <div className="col-lg-6">
                <div className="card shadow-lg border-0">
                  <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-12">
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Your Name"
                          />
                          {errors.name && (
                            <small className="text-danger">
                              {errors.name}
                            </small>
                          )}
                        </div>

                        <div className="col-12">
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Your Email"
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          )}
                        </div>

                        <div className="col-12">
                          <input
                            type="text"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Your Mobile"
                          />
                          {errors.mobile && (
                            <small className="text-danger">
                              {errors.mobile}
                            </small>
                          )}
                        </div>

                        <div className="col-12">
                          <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Subject"
                          />
                          {errors.subject && (
                            <small className="text-danger">
                              {errors.subject}
                            </small>
                          )}
                        </div>

                        <div className="col-12">
                          <textarea
                            name="message"
                            rows="4"
                            value={form.message}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Your Message"
                          ></textarea>
                          {errors.message && (
                            <small className="text-danger">
                              {errors.message}
                            </small>
                          )}
                        </div>

                        <div className="col-12 text-end">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-lg px-5"
                            style={{
                              background: "#00578c",
                              color: "#fff",
                            }}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAP SECTION ================= */}
        <div className="container-fluid px-0">
          <div className="ratio ratio-21x9">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3491085129845!2d77.21364402429036!3d28.55927773740567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26a17c97447%3A0x2933bfed2d404d7b!2sNeeti%20Bagh%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1772088801470!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactusPage;
