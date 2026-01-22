import { useState } from "react";
import { FaBars, FaTimes, FaLinkedinIn, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* NAV LINKS */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <a className="nav-link active-link" href="#">Home</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-link" href="#">
                About <FaChevronDown className="dropdown-icon" />
              </a>
              <ul className="dropdown-menu modern-dropdown">
                <li><a className="dropdown-item" href="#">About Us</a></li>
                <li><a className="dropdown-item" href="#">Approach</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-link" href="#">
                Services <FaChevronDown className="dropdown-icon" />
              </a>
              <ul className="dropdown-menu modern-dropdown">
                <li><a className="dropdown-item" href="#">Research & Assesment</a></li>
                <li><a className="dropdown-item" href="#">In-Country Representation</a></li>
                <li><a className="dropdown-item" href="#">Academic Collaboration</a></li>
                <li><a className="dropdown-item" href="#">Admission Compliance</a></li>
                <li><a className="dropdown-item" href="#">Strategic Marketing</a></li>
                <li><a className="dropdown-item" href="#">Operationl Support</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-link" href="#">
                Media <FaChevronDown className="dropdown-icon" />
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
