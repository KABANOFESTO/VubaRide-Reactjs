import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/style.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current location

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to check if the link is active based on the current location
  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="container-fluid position-relative p-0">
      <nav
        className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 fixed-top ${
          isScrolled ? "bg-transparent navbar-scrolled" : "bg-white"
        }`}
      >
        <Link to="/" className="navbar-brand p-0">
          <h1 className="m-0">
            <i className="fa fa-map-marker-alt me-3" id="title"></i>VubaRide
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto py-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActiveLink("/")}`} id="home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActiveLink("/about")}`}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service" className={`nav-link ${isActiveLink("/service")}`}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/garrely" className={`nav-link ${isActiveLink("/garrely")}`}>
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${isActiveLink("/contact")}`}>
                Contact
              </Link>
            </li>
          </ul>
          <Link
            to="/bookings"
            className="btn btn-primary rounded-pill py-2 px-4 ms-lg-4"
          >
            Book Now
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
