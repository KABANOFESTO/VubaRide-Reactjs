package rw.transport.vubaride.security.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rw.transport.vubaride.model.User;

import java.util.Collection;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VubaDetails implements UserDetails {
    
    private Long id;
    private String email;
    private String password;
    private Collection<GrantedAuthority> authorities; 

    /**
     * Builds VubaDetails from the given User model.
     * 
     * @param user the user entity from which to build VubaDetails
     * @return VubaDetails instance
     */
    public static VubaDetails buildUserDetails(User user) {
        // Removed roles mapping logic; simply return the essential user details
        return new VubaDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                null // Authorities or roles are no longer being set
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;  // Return empty or null as roles functionality is removed
    }

    @Override
    public String getPassword() {
        return password;  // Return user's encoded password
    }

    @Override
    public String getUsername() {
        return email;  // Use email as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // All accounts are non-expired by default
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Assume accounts are not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Credentials are considered non-expired
    }

    @Override
    public boolean isEnabled() {
        return true;  // Assume user is enabled by default
    }
}
