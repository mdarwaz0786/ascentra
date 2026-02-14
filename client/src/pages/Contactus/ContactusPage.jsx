import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";

const ContactusPage = () => {
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
                    E: xxxxx@ace.com <br />
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
                  <p className="text-muted mb-0">contact@ace.com</p>
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
                    <form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Your Name"
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Your Email"
                          />
                        </div>

                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Subject"
                          />
                        </div>

                        <div className="col-12">
                          <textarea
                            className="form-control form-control-lg"
                            rows="4"
                            placeholder="Your Message"
                          ></textarea>
                        </div>

                        <div className="col-12 text-end">
                          <button
                            type="submit"
                            className="btn btn-lg px-5"
                            style={{ background: "#00578c", color: "#fff" }}
                          >
                            Send Message
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
              src="https://www.google.com/maps?q=New%20Delhi%20India&output=embed"
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
