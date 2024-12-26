import React from "react";
import About from "../pages/About";
import '../css/style.css'

const AboutB = () => {
    return (
        <>
            <div className="container-fluid bg-breadcrumb">
                <div
                    className="container text-center py-5"
                    style={{ maxWidth: "900px" }}
                >
                    <h3 className="text-white display-3 mb-4">About Us</h3>
                </div>
            </div>
            <About />
        </>
    );
};

export default AboutB;
