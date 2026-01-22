import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-lg-4 col-md-6">
            <img src={logo} alt="logo" className="footer-logo" />
            <p className="footer-text mt-3">
              Delivering trusted advisory, consulting, and strategic insights
              with a global perspective and local expertise.
            </p>

            <div className="footer-social">
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaFacebookF /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-title">Company</h6>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Services</h6>
            <ul className="footer-links">
              <li><a href="#">Consulting</a></li>
              <li><a href="#">Advisory</a></li>
              <li><a href="#">Risk Management</a></li>
              <li><a href="#">Market Research</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Get in Touch</h6>
            <p className="footer-text mb-2">
              info@yourcompany.com
            </p>
            <p className="footer-text">
              Mumbai, India
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
