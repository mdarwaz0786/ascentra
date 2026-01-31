import { useState } from "react";
import { FaBars, FaTimes, FaLinkedinIn, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
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
          {open ? <FaTimes size={35} color="#00578c" /> : <FaBars size={35} color="#00578c" />}
        </button>

        {/* NAV LINKS */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <a className="nav-link active-link" href="#">Home</a>
            </li>

            {/* ABOUT */}
            <li
              className={`nav-item dropdown ${activeDropdown === "about" ? "show" : ""
                }`}
            >
              <a
                className="nav-link dropdown-link"
                href="#"
                onClick={() => toggleDropdown("about")}
              >
                About
                <FaChevronDown
                  className={`dropdown-icon ${activeDropdown === "about" ? "rotate" : ""
                    }`}
                />
              </a>

              <ul className="dropdown-menu modern-dropdown">
                <li><a className="dropdown-item" href="#">About Us</a></li>
                <li><a className="dropdown-item" href="#">Approach</a></li>
              </ul>
            </li>

            {/* SERVICES */}
            <li
              className={`nav-item dropdown ${activeDropdown === "services" ? "show" : ""
                }`}
            >
              <a
                className="nav-link dropdown-link"
                href="#"
                onClick={() => toggleDropdown("services")}
              >
                Services
                <FaChevronDown
                  className={`dropdown-icon ${activeDropdown === "services" ? "rotate" : ""
                    }`}
                />
              </a>

              <ul className="dropdown-menu modern-dropdown">
                <li><a className="dropdown-item" href="#">Research & Assessment</a></li>
                <li><a className="dropdown-item" href="#">In-Country Representation</a></li>
                <li><a className="dropdown-item" href="#">Academic Collaboration</a></li>
                <li><a className="dropdown-item" href="#">Admission Compliance</a></li>
                <li><a className="dropdown-item" href="#">Strategic Marketing</a></li>
                <li><a className="dropdown-item" href="#">Operational Support</a></li>
              </ul>
            </li>

            {/* MEDIA */}
            <li
              className={`nav-item dropdown ${activeDropdown === "media" ? "show" : ""
                }`}
            >
              <a
                className="nav-link dropdown-link"
                href="#"
                onClick={() => toggleDropdown("media")}
              >
                Media
                <FaChevronDown
                  className={`dropdown-icon ${activeDropdown === "media" ? "rotate" : ""
                    }`}
                />
              </a>

              <ul className="dropdown-menu modern-dropdown">
                <li><a className="dropdown-item" href="#">Media</a></li>
                <li><a className="dropdown-item" href="#">News & Blog</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Publications</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Events</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Careers</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Contact Us</a>
            </li>

            {/* LINKEDIN */}
            <li className="nav-item ms-lg-3">
              <a href="#" className="linkedin-btn">
                <FaLinkedinIn />
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
