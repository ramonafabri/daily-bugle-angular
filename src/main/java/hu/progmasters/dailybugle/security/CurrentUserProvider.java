package hu.progmasters.dailybugle.security;


import hu.progmasters.dailybugle.domain.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserProvider {


    public User getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("User not logged in");
        }

        return (User) authentication.getPrincipal();

    }
}


