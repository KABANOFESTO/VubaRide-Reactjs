import React from "react";
import '../css/style.css';

const Contact = () => {
  return (
    <div className="container-fluid contact bg-light py-5">
      <div className="container py-5">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
          <h5 className="section-title px-3">Contact Us</h5>
          <h1 className="mb-0">Contact For any feedback</h1>
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-4">
            <div className="bg-white rounded p-4">
              <div className="text-center mb-4">
                <i className="fa fa-map-marker-alt fa-3x text-primary"></i>
                <h4 className="text-primary">
                  <address></address>
                </h4>
                <p className="mb-0">Kigali City, Rwanda</p>
              </div>
              <div className="text-center mb-4">
                <i className="fa fa-phone-alt fa-3x text-primary mb-3"></i>
                <h4 className="text-primary">Mobile</h4>
                <p className="mb-0">+250785206973</p>
              </div>
              <div className="text-center">
                <i className="fa fa-envelope-open fa-3x text-primary mb-3"></i>
                <h4 className="text-primary">Email</h4>
                <p className="mb-0">Levis@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <h3 className="mb-2">Send us a message</h3>
            <p className="mb-4">
              The contact form is currently inactive. Get a functional and
              working contact form with TemberaNawe in a few minutes.
            </p>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0"
                      id="name"
                      placeholder="Your Name"
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control border-0"
                      id="email"
                      placeholder="Your Email"
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0"
                      id="subject"
                      placeholder="Subject"
                    />
                    <label htmlFor="subject">Subject</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control border-0"
                      placeholder="Leave a message here"
                      id="message"
                      style={{ height: "160px" }}
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-12">
            <div className="rounded">
              <iframe
                className="rounded w-100"
                style={{ height: "450px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15950.145836841859!2d30.07844745!3d-1.93787775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6a40203f041%3A0x5f8434259d8c4393!2sKacyiru%2C%20Kigali!5e0!3m2!1sen!2srw!4v1722271949214!5m2!1sen!2srw"
                width="400"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
