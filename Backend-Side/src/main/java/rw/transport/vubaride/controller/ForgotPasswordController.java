package rw.transport.vubaride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import rw.transport.vubaride.model.User;
import rw.transport.vubaride.repository.UserRepository;
import rw.transport.vubaride.service.EmailService;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5501", "http://localhost:3000", "http://127.0.0.1:5500"}, allowedHeaders = "*")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(ForgotPasswordController.class);

    @PostMapping("/forgot-password")
    public ResponseEntity<String> processForgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Check if email is provided
        if (email == null || email.isEmpty()) {
            logger.warn("Email is missing in the request.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is required.");
        }

        // Fetch the user by email
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            logger.warn("User with email {} not found.", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();

        // Generate a reset token
        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        userRepository.save(user); // Save the user with the reset token

        // Prepare and send the reset password email
        String resetLink = "http://127.0.0.1:5501/reset.html?token=" + token;
        String subject = "Reset Password";
        String body = "Hello from VubaRide!\n\nWe received a request to reset your password for your VubaRide account. To reset it, simply click the link below:\n"
                + resetLink
                + "\n\nIf you didn't request a password reset, please ignore this message.\n\nThank you for riding with us!\n\nBest regards,\nThe VubaRide Team";

        try {
            emailService.sendSimpleEmail(user.getEmail(), subject, body);
            logger.info("Reset password email sent to {}", email);
            return ResponseEntity.ok("Reset password email sent.");
        } catch (Exception e) {
            logger.error("Failed to send reset email to {}: {}", user.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send reset email.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        // Validate input
        if (token == null || token.isEmpty() || newPassword == null || newPassword.isEmpty()) {
            logger.warn("Token or new password is missing in the request.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token and new password are required.");
        }

        // Find user by reset token
        Optional<User> userOpt = userRepository.findByResetPasswordToken(token);
        if (!userOpt.isPresent()) {
            logger.warn("Invalid or expired reset token: {}", token);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid or expired reset token.");
        }

        try {
            User user = userOpt.get();

            // Update password
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetPasswordToken(null); // Clear the reset token
            userRepository.save(user);

            logger.info("Password successfully reset for user: {}", user.getEmail());

            // Send confirmation email
            String subject = "Password Reset Successful";
            String body = "Hello from VubaRide!\n\nYour password has been successfully reset. If you did not perform this action, please contact our support team immediately.\n\nBest regards,\nThe VubaRide Team";
            
            emailService.sendSimpleEmail(user.getEmail(), subject, body);

            return ResponseEntity.ok("Password successfully reset.");
            
        } catch (Exception e) {
            logger.error("Error resetting password: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while resetting the password.");
        }
    }
}