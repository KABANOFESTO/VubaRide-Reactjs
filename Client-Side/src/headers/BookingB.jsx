import React from "react";
import Booking from "../pages/Booking";
import '../css/style.css'

const BookingB = () => {
    return (
        <>
            <div className="container-fluid bg-breadcrumb">
                <div
                    className="container text-center py-5"
                    style={{ maxWidth: "900px" }}
                >
                    <h3 className="text-white display-3 mb-4">Book Ur Ticket</h3>
                </div>
            </div>
            <Booking />
        </>
    );
};

export default BookingB;
