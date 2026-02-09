import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
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
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/career">Careers</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-title">Services</h6>
            <ul className="footer-links">
              <li><Link to="/market-development">Market Development</Link></li>
              <li><Link to="/market-entry">Market Entry</Link></li>
              <li><Link to="/market-presence">Market Presence</Link></li>
              <li><Link to="/market-expansion">Market Expansion</Link></li>
            </ul>
          </div>

          {/* MEDIA */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-title">Media</h6>
            <ul className="footer-links">
              <li><Link to="/blog">News & Blog</Link></li>
              <li><Link to="/media">Media</Link></li>
              <li><Link to="/event">Events</Link></li>
              <li><Link to="/publication">Publications</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-title">Get in Touch</h6>
            <p className="footer-text mb-2">
              contact@aceascentra.com
            </p>
            <p className="footer-text">
              New Delhi, India
            </p>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ACE ASCENTRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
