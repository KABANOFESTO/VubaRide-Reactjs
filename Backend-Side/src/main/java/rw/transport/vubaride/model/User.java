package rw.transport.vubaride.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String username;

    // Role field - Enum representing user roles (like ADMIN, USER, etc.)
    @Enumerated(EnumType.STRING)
    private Role role;  

    // Token for password reset functionality
    @Column(name = "reset_password_token")
    private String resetPasswordToken;
}
