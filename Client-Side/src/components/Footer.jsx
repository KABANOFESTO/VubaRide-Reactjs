import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid footer py-5 bg-dark text-white">
        <div className="container py-5">
          <div className="row g-5">
            {/* Get In Touch */}
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item d-flex flex-column">
                <h4 className="mb-4 text-white">Get In Touch</h4>
                <a href="#">
                  <i className="fas fa-home me-2"></i>Kigali City, Rwanda
                </a>
                <a href="mailto:kabanofesto1@gmail.com">
                  <i className="fas fa-envelope me-2"></i> kabanofesto1@gmail.com
                </a>
                <a href="tel:+250785206973">
                  <i className="fas fa-phone me-2"></i> +0250785206973
                </a>
                <div className="d-flex align-items-center">
                  <i className="fas fa-share fa-2x text-white me-2"></i>
                  <a
                    className="btn-square btn btn-primary rounded-circle mx-1"
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn-square btn btn-primary rounded-circle mx-1"
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn-square btn btn-primary rounded-circle mx-1"
                    href="#"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    className="btn-square btn btn-primary rounded-circle mx-1"
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Link */}
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item d-flex flex-column">
                <h4 className="mb-4 text-white">Quick Link</h4>
                <a href="#">
                  <i className="fas fa-angle-right me-2"></i> About
                </a>
                <a href="#">
                  <i className="fas fa-angle-right me-2"></i> Service
                </a>
                <a href="#">
                  <i className="fas fa-angle-right me-2"></i> Price
                </a>
                <a href="#">
                  <i className="fas fa-angle-right me-2"></i> Gallery
                </a>
                <a href="#">
                  <i className="fas fa-angle-right me-2"></i> Contact Us
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item d-flex flex-column">
                <h4 className="mb-4 text-white">Support</h4>
                <a href="#">
                  <i className="fas fa-angle-right me-2"></i> Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Start */}
      <div className="container-fluid copyright text-body py-4 bg-dark text-white">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 text-center text-md-end mb-md-0">
              <i className="fas fa-copyright me-2"></i>
              <a className="text-white" href="#">
                VubaRide
              </a>
              , All rights reserved.
            </div>
            <div className="col-md-6 text-center text-md-start">
              Designed By{" "}
              <a className="text-white" href="https://htmlcodex.com">
                Kabano😎
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
