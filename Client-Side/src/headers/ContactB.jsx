import React from "react";
import Contact from "../pages/Contact";
import '../css/style.css'

const ContactB = () => {
    return (
        <>
            <div className="container-fluid bg-breadcrumb">
                <div
                    className="container text-center py-5"
                    style={{ maxWidth: "900px" }}
                >
                    <h3 className="text-white display-3 mb-4">Contact Us</h3>
                </div>
            </div>
            <Contact />
        </>
    );
};

export default ContactB;
