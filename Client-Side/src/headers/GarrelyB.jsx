import React from "react";
import Gallery from "../pages/Gallery";
import '../css/style.css'

const GarrelyB = () => {
    return (
        <>
            <div className="container-fluid bg-breadcrumb">
                <div
                    className="container text-center py-5"
                    style={{ maxWidth: "900px" }}
                >
                    <h3 className="text-white display-3 mb-4">Our Gallery</h3>
                </div>
            </div>
            <Gallery />
        </>
    );
};

export default GarrelyB;
