import React from 'react';
import '../css/style.css'
import b1 from '../assets/images/1-bus.jpg'
import b2 from '../assets/images/3-bus.jpg'
import { Link } from 'react-router-dom';


const Banner = () => {
    return (
        <div className="carousel-header">
            <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#carouselId" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carouselId" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselId" data-bs-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <img src={b1} className="img-fluid" alt="Image" />
                        <div className="carousel-caption">
                            <div className="p-3" style={{ maxWidth: '900px', margin: '40px auto' }}>
                                <h4
                                    className="text-white text-uppercase fw-bold mb-4"
                                    style={{ letterSpacing: '3px' }}
                                >
                                    BOOK Ritco Ticket
                                </h4>
                                <h1 className="display-2 text-capitalize text-white mb-4">
                                    Let's Explore The beauty of Rwanda!
                                </h1>
                                <p className="mb-5 fs-5">
                                    Rwanda, the "Land of a Thousand Hills," offers breathtaking landscapes,
                                    mountain gorillas in Volcanoes National Park, vibrant culture, and the serene
                                    shores of Lake Kivu.
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link to='/login'
                                        className="btn-hover-bg btn btn-primary rounded-pill text-white py-3 px-5"
                                    >
                                        Connect Us...
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={b2} className="img-fluid" alt="Image" />
                        <div className="carousel-caption">
                            <div className="p-3" style={{ maxWidth: '900px' }}>
                                <h4
                                    className="text-white text-uppercase fw-bold mb-4"
                                    style={{ letterSpacing: '3px' }}
                                >
                                    BOOK Horizon Express
                                </h4>
                                <h1 className="display-2 text-capitalize text-white mb-4">
                                    Let's travel Lake Kivu and Enjoy the view
                                </h1>
                                <p className="mb-5 fs-5">
                                    Lake Kivu in Rwanda offers picturesque views, tranquil waters, and a peaceful
                                    atmosphere. It's ideal for activities like boating, swimming, and exploring
                                    charming lakeside towns.
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <a
                                        className="btn-hover-bg btn btn-primary rounded-pill text-white py-3 px-5"
                                        href="./index.html"
                                    >
                                        Connect Us...
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={b1} className="img-fluid" alt="Image" />
                        <div className="carousel-caption">
                            <div className="p-3" style={{ maxWidth: '900px' }}>
                                <h4
                                    className="text-white text-uppercase fw-bold mb-4"
                                    style={{ letterSpacing: '3px' }}
                                >
                                    BOOK Vacation Ticket
                                </h4>
                                <h1 className="display-2 text-capitalize text-white mb-4">
                                    Welcome To Umva Muhazi, Enjoy The View!
                                </h1>
                                <p className="mb-5 fs-5">
                                    Umva Muhazi is a serene retreat on Lake Muhazi in Rwanda, offering stunning
                                    views, comfortable accommodations, and a perfect setting for relaxation and
                                    nature activities.
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <a
                                        className="btn-hover-bg btn btn-primary rounded-pill text-white py-3 px-5"
                                        href="./index.html"
                                    >
                                        Connect Us...
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon btn bg-primary" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon btn bg-primary" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Banner;
