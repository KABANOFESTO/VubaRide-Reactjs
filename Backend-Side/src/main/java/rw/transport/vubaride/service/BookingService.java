package rw.transport.vubaride.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.transport.vubaride.repository.BookingRepository;
import rw.transport.vubaride.model.Booking;
import rw.transport.vubaride.model.BookingStatus;


import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Optional<Booking> getBookingByCode(String bookingCode) {
        return Optional.ofNullable(bookingRepository.findByBookingCode(bookingCode));
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    public Booking updateBookingStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(newStatus);
        return bookingRepository.save(booking);
    }

    public List<Booking> getPendingBookings() {
        return bookingRepository.findByStatus(BookingStatus.PENDING);
    }

    public List<Booking> getBookingsByUserAndStatus(String userId, BookingStatus status) {
        return bookingRepository.findByUserIdAndStatus(userId, status);
    }
}

