import React, { useState } from 'react';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

const Booking = () => {
  const [bookingResult, setBookingResult] = useState(null);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [ticketInfo, setTicketInfo] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must log in first!');
      window.location.href = '/login';
      return;
    }

    const formData = new FormData(e.target);
    const bookingData = {
      userId: formData.get('name'),
      routeId: formData.get('destination'),
      seatNumber: formData.get('seatNumber'),
      bookingDate: formData.get('date'),
      bookingTime: formData.get('time'),
    };

    try {
      const response = await fetch('http://localhost:8081/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error('Booking failed.');

      const result = await response.json();
      setBookingResult(result);
      alert('Booking successful!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleViewTicket = async () => {
    const bookingCode = prompt('Please enter your booking code:');
    if (!bookingCode) return;

    try {
      const response = await fetch(`http://localhost:8081/api/bookings/code/${bookingCode}`);
      if (!response.ok) throw new Error('Ticket not found.');

      const ticketData = await response.json();
      setTicketInfo(JSON.stringify(ticketData, null, 2));
      setTicketModalVisible(true);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDownloadTicket = async () => {
    if (!bookingResult) return;

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('VubaRide Ticket', 105, 20, { align: 'center' });

    pdf.setFontSize(12);
    const details = [
      `Name: ${bookingResult.userId}`,
      `Booking Code: ${bookingResult.bookingCode}`,
      `Route: ${bookingResult.routeId}`,
      `Seat Number: ${bookingResult.seatNumber}`,
      `Date: ${bookingResult.bookingDate}`,
      `Time: ${bookingResult.bookingTime}`,
    ];
    details.forEach((detail, index) => pdf.text(detail, 20, 40 + index * 10));

    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, bookingResult.bookingCode, { format: 'CODE128' });
    const barcodeImage = barcodeCanvas.toDataURL('image/png');
    pdf.addImage(barcodeImage, 'PNG', 20, 100, 170, 50);

    pdf.setFontSize(10);
    pdf.text('Thank you for choosing VubaRide!', 105, 280, { align: 'center' });
    pdf.save(`VubaRide_Ticket_${bookingResult.bookingCode}.pdf`);
  };

  const handleCloseModal = () => setTicketModalVisible(false);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
    window.location.href = '/login';
  };

  return (
    <div className="container-fluid booking py-5" id="booking">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h1 className="text-white mb-4">VubaRide Booking</h1>
            <p className="text-white mb-4">Book your next adventure with us!</p>
            {bookingResult && (
              <div className="text-white mb-4">
                Your Booking Code: {bookingResult.bookingCode}
              </div>
            )}
            {bookingResult && (
              <button
                className="btn btn-light text-primary rounded-pill py-3 px-5 mt-2"
                onClick={handleDownloadTicket}
              >
                Download Ticket
              </button>
            )}
            <button
              className="btn btn-light text-primary rounded-pill py-3 px-5 mt-2"
              onClick={handleViewTicket}
            >
              View My Ticket
            </button>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="name" placeholder="Your Name" />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="seatNumber"
                      placeholder="Enter Seat Number"
                    />
                    <label htmlFor="seatNumber">Seat Number</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="date" className="form-control" name="date" placeholder="Booking Date" />
                    <label htmlFor="date">Booking Date</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <select className="form-select" name="destination">
                      <option value="" disabled>
                        Select Destination
                      </option>
                      <option value="Muhanga-Kigali">Muhanga-Kigali</option>
                      <option value="Kigali-Musanze">Kigali-Musanze</option>
                      <option value="Kigali-Gisenyi">Kigali-Gisenyi</option>
                    </select>
                    <label htmlFor="destination">Destination</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input type="time" className="form-control" name="time" placeholder="Booking Time" />
                    <label htmlFor="time">Booking Time</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary text-white w-100 py-3" type="submit">
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {ticketModalVisible && (
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <h3>Booking Details</h3>
          <pre>{ticketInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default Booking;
