package rw.transport.vubaride.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import rw.transport.vubaride.model.Role;
import rw.transport.vubaride.model.User;
import rw.transport.vubaride.security.jwt.JwtUtil;
import rw.transport.vubaride.service.IUserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;
    private final JwtUtil jwtUtil; // Inject jwtUtil here

    public UserController(IUserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil; // Constructor injection for jwtUtil
    }

    // Endpoint for user registration
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            // Set default role if not provided
            if (user.getRole() == null) {
                user.setRole(Role.USER); // default to USER role
            }
            userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error during user registration: " + e.getMessage());
        }
    }

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            System.out.println("Attempting to log in user with email: " + user.getEmail());

            boolean isAuthenticated = userService.authenticateUser(user.getEmail(), user.getPassword());

            // Log whether the authentication was successful
            System.out.println("Authentication successful: " + isAuthenticated);

            if (isAuthenticated) {
                User authenticatedUser = userService.getUser(user.getEmail());

                // Log the user's details
                System.out.println("Authenticated user: " + authenticatedUser);

                String token = jwtUtil.generateToken(authenticatedUser);

                // Specify the type parameters for HashMap<String, String>
                Map<String, String> response = new HashMap<String, String>();
                response.put("message", "Login successful!");
                response.put("token", token);

                return ResponseEntity.ok(response); // Return response with message and token
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during login: " + e.getMessage());
        }
    }

    // Endpoint to fetch all users
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            // Remove "Bearer " from the token
            String jwtToken = authorizationHeader.substring(7);
            Claims claims = jwtUtil.extractClaims(jwtToken);

            // Extract the user's role from the token
            String userRole = claims.get("role", String.class);

            // Check if the user has ADMIN privileges
            if (!Role.ADMIN.name().equals(userRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Insufficient privileges");
            }

            // Fetch the list of users
            List<User> users = userService.getUsers();
            return ResponseEntity.ok(users);

        } catch (JwtException e) {
            // Handle JWT-specific exceptions
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        } catch (Exception e) {
            // Catch all other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching the users");
        }
    }

    // Endpoint to fetch user by email
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            User theUser = userService.getUser(email);
            return ResponseEntity.ok(theUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }

    // Endpoint to delete a user by email
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<String> deleteUser(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable("email") String email) {
        try {
            // Extract and validate JWT token
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is required");
            }

            // Remove "Bearer " from the token
            String jwtToken = authorizationHeader.substring(7);
            Claims claims = jwtUtil.extractClaims(jwtToken);

            // Extract the user's role from the token
            String userRole = claims.get("role", String.class);
            String tokenUserEmail = claims.getSubject(); // Get email from token

            // Check if the user has ADMIN privileges
            if (!Role.ADMIN.name().equals(userRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Only administrators can delete users");
            }

            // Prevent admin from deleting their own account
            if (email.equals(tokenUserEmail)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot delete your own admin account");
            }

            // Proceed with deletion
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");

        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting user: " + e.getMessage());
        }
    }
}
