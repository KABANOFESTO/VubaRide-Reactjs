import React from 'react';
import '../css/style.css'

const Services = () => {
  return (
    <div className="container-fluid bg-light service py-5">
      <div className="container py-5">
        {/* Section Title */}
        <div
          className="mx-auto text-center mb-5"
          style={{ maxWidth: '900px' }}
        >
          <h5 className="section-title px-3">Services</h5>
          <h1 className="mb-0">Our Services</h1>
        </div>

        {/* Services Content */}
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-6">
            <div className="row g-4">
              {/* Service 1 */}
              <div className="col-12">
                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 pe-0">
                  <div className="service-content text-end">
                    <h5 className="mb-4">Hotel Reservation</h5>
                    <p className="mb-0">
                      Hotel reservation services assist in booking
                      accommodations by providing options, comparing prices, and
                      securing rooms at desired hotels. They often include
                      features like flexible dates, special offers, and customer
                      reviews.
                    </p>
                  </div>
                  <div className="service-icon p-4">
                    <i className="fa fa-hotel fa-4x text-primary"></i>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="col-12">
                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 pe-0">
                  <div className="service-content text-end">
                    <h5 className="mb-4">Financial Guidance</h5>
                    <p className="mb-0">
                      Financial guidance, through services like budgeting
                      advice, investment strategies, and retirement planning,
                      helps individuals and businesses manage their finances
                      wisely, ensuring long-term stability and growth.
                    </p>
                  </div>
                  <div className="service-icon p-4">
                    <i className="fa fa-home fa-4x text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6">
            <div className="row g-4">
              {/* Service 3 */}
              <div className="col-12">
                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 ps-0">
                  <div className="service-icon p-4">
                    <i className="fa fa-user fa-4x text-primary"></i>
                  </div>
                  <div className="service-content">
                    <h5 className="mb-4">Travel Guides</h5>
                    <p className="mb-0">
                      Travel guidance offers support with planning trips,
                      including destination recommendations, itinerary
                      suggestions, visa information, and travel tips. It helps
                      travelers navigate logistics and ensures a smooth,
                      enjoyable journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="col-12">
                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 ps-0">
                  <div className="service-icon p-4">
                    <i className="fa fa-cog fa-4x text-primary"></i>
                  </div>
                  <div className="service-content">
                    <h5 className="mb-4">Event Management</h5>
                    <p className="mb-0">
                      Event management involves planning, organizing, and
                      coordinating events, from weddings and corporate functions
                      to conferences and parties. It includes tasks like venue
                      selection, logistics, budgeting, and ensuring a seamless
                      guest experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="col-12">
            <div className="text-center">
              <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href="">
                Service More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
