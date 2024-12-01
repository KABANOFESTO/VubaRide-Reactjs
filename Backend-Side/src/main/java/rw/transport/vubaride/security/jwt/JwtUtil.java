package rw.transport.vubaride.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import rw.transport.vubaride.model.User;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;

    @Value("${auth.token.expirationInMs}")
    private long jwtExpirationMs; // Ensure this is long

    private Key secretKey;

    @PostConstruct
    private void init() {
        // Generate secret key from the JWT secret
        this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Generate JWT token based on user
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())  // Set the user's email as the subject
                .claim("role", user.getRole().name())  // Include user role as a claim
                .setIssuedAt(new Date())  // Token creation time
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))  // Set expiration time
                .signWith(secretKey, SignatureAlgorithm.HS256)  // Sign token with the secret key
                .compact();  // Compact to return a complete JWT token string
    }

    // Extract claims from the token
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)  // Set the key for signature validation
                .build()
                .parseClaimsJws(token)
                .getBody();  // Return the claims
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            extractClaims(token); // Check if the claims can be extracted; if not, it will throw an exception
            return true;
        } catch (Exception e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }

    // Extract username from the token
    public String getUserNameFromToken(String token) {
        return extractClaims(token).getSubject();
    }

    // Extract role from the token
    public String getRoleFromToken(String token) {
        return extractClaims(token).get("role", String.class);
    }
}
