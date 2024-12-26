import React from 'react';
import bg from '../assets/images/bg-bus.jpg';
import '../css/style.css'

const About = () => {
    return (
        <div className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    {/* Left Image Section */}
                    <div className="col-lg-5">
                        <div
                            className="h-100"
                            style={{
                                border: '50px solid',
                                borderColor: 'transparent #13357B transparent #13357B',
                            }}
                        >
                            <img
                                src={bg}
                                className="img-fluid w-100 h-100"
                                alt="About Section"
                            />
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div
                        className="col-lg-7"
                        style={{
                            background:
                                'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(img/rwanda.png)',
                        }}
                    >
                        <h5 className="section-about-title pe-3">About Us</h5>
                        <h1 className="mb-4">
                            Welcome to <span className="text-primary">VubaRide</span>
                        </h1>
                        <p className="mb-4">
                            TemberaNawe is Rwanda's premier tourism website, showcasing the
                            country's diverse attractions. It highlights natural wonders like
                            Volcanoes National Park, cultural sites, and vibrant cities.
                        </p>
                        <p className="mb-4">
                            The platform offers travel tips, itineraries, and booking options,
                            promoting Rwanda as a top destination for adventurers, nature
                            lovers, and cultural enthusiasts. Discover the "Land of a Thousand
                            Hills" with TemberaNawe.
                        </p>
                        <div className="row gy-2 gx-4 mb-4">
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Sourthern Province
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Northern Province
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Eastern Province
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Western Province
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Kigali City
                                </p>
                            </div>
                        </div>
                        <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href="">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
