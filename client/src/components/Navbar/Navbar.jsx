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
      <div className="container">

        {/* LOGO */}
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </a>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler border-0"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes size={25} color="#00578c" /> : <FaBars size={25} color="#00578c" />}
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
                   ${location.pathname == "/about-us"
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
              </ul>
            </li>

            {/* SERVICES */}
            <li
              className={`nav-item dropdown ${activeDropdown === "services" ? "show" : ""}`}
            >
              <a
                className={`nav-link dropdown-link
                   ${location.pathname == "/market-development" ||
                    location.pathname == "/market-entry" ||
                    location.pathname == "/market-presence" ||
                    location.pathname == "/market-expansion"
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
                <li><Link className="dropdown-item" to="/market-development">Market Development</Link></li>
                <li><Link className="dropdown-item" to="/market-entry">Market Entry</Link></li>
                <li><Link className="dropdown-item" to="/market-presence">Market Presence</Link></li>
                <li><Link className="dropdown-item" to="/market-expansion">Market Expansion</Link></li>
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
                <li><Link className="dropdown-item" to="/blog">News & Blog</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/publication" ? "active-link" : ""}`} to="/publication">Publications</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/event" ? "active-link" : ""}`} to="/event">Events</Link>
            </li>

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
