import React from "react";
import Services from "../pages/Services";
import '../css/style.css'

const ServicesB = () => {
    return (
        <>
            <div className="container-fluid bg-breadcrumb">
                <div
                    className="container text-center py-5"
                    style={{ maxWidth: "900px" }}
                >
                    <h3 className="text-white display-3 mb-4">Our Services</h3>
                </div>
            </div>
            <Services />
        </>
    );
};

export default ServicesB;
