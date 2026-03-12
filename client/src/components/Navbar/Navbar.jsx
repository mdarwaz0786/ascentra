import { useState } from "react";
import { FaBars, FaTimes, FaLinkedinIn, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white custom-navbar">
      <div className="container-fluid">

        {/* LOGO */}
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </a>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler border-0"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes size={30} color="#00578c" /> : <FaBars size={30} color="#00578c" />}
        </button>

        {/* NAV LINKS */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`} to="/">Home</Link>
            </li>

            {/* ABOUT */}
            <li
              className={`nav-item dropdown ${activeDropdown == "about" ? "show" : ""}`}
            >
              <a
                className={`nav-link dropdown-link
                   ${location.pathname == "/about-us" ||
                    location.pathname == "/our-team" ||
                    location.pathname == "/our-growth-framework"
                    ? "active-link"
                    : ""}`
                }
                href="#"
                onClick={() => toggleDropdown("about")}
              >
                About
                <FaChevronDown
                  className={`dropdown-icon ${activeDropdown === "about" ? "rotate" : ""}`}
                />
              </a>

              <ul className="dropdown-menu modern-dropdown">
                <li><Link className="dropdown-item" to="/about-us">About Us</Link></li>
                <li><Link className="dropdown-item" to="/our-team">Our Team</Link></li>
                <li><Link className="dropdown-item" to="/our-growth-framework">Our Growth Framework</Link></li>
              </ul>
            </li>

            {/* SERVICES */}
            <li
              className={`nav-item dropdown ${activeDropdown === "services" ? "show" : ""}`}
            >
              <a
                className={`nav-link dropdown-link
                   ${location.pathname == "/research-academic-and-innovation-partnerships" ||
                    location.pathname == "/in-country-representation-and-market-growth" ||
                    location.pathname == "/events-outreach-and-engagement" ||
                    location.pathname == "/operational-and-compliance-support"
                    ? "active-link"
                    : ""}`
                }
                href="#"
                onClick={() => toggleDropdown("services")}
              >
                Services
                <FaChevronDown
                  className={`dropdown-icon ${activeDropdown === "services" ? "rotate" : ""}`}
                />
              </a>

              <ul className="dropdown-menu modern-dropdown">
                <li><Link className="dropdown-item" to="/research-academic-and-innovation-partnerships">Research, Academic & Innovation Partnerships</Link></li>
                <li><Link className="dropdown-item" to="/in-country-representation-and-market-growth">In-Country Representation & Market Growth</Link></li>
                <li><Link className="dropdown-item" to="/events-outreach-and-engagement">Events, Outreach & Engagement</Link></li>
                <li><Link className="dropdown-item" to="/operational-and-compliance-support">Operational & Compliance Support</Link></li>
              </ul>
            </li>

            {/* MEDIA */}
            <li
              className={`nav-item dropdown ${activeDropdown === "media" ? "show" : ""}`}
            >
              <a
                className={`nav-link dropdown-link
                   ${location.pathname == "/media" ||
                    location.pathname == "/blog"
                    ? "active-link"
                    : ""}`
                }
                href="#"
                onClick={() => toggleDropdown("media")}
              >
                Media
                <FaChevronDown
                  className={`dropdown-icon ${activeDropdown === "media" ? "rotate" : ""}`}
                />
              </a>

              <ul className="dropdown-menu modern-dropdown">
                <li><Link className="dropdown-item" to="/media">Media</Link></li>
                <li><Link className="dropdown-item" to="/news-and-blog">News & Blog</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/publication" ? "active-link" : ""}`} to="/publication">Publications</Link>
            </li>

            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/event" ? "active-link" : ""}`} to="/event">Events</Link>
            </li> */}

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/career" ? "active-link" : ""}`} to="/career">Careers</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/contact-us" ? "active-link" : ""}`} to="/contact-us">Contact Us</Link>
            </li>

            {/* LINKEDIN */}
            <li className="nav-item ms-lg-3">
              <Link to="https://www.linkedin.com/" target="_blank" className="linkedin-btn">
                <FaLinkedinIn />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
