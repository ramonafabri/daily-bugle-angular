package hu.progmasters.dailybugle.security;


import hu.progmasters.dailybugle.domain.User;
import hu.progmasters.dailybugle.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserProvider {


    private final UserRepository userRepository;
    private final HttpServletRequest request;

    public CurrentUserProvider(UserRepository userRepository, HttpServletRequest request) {
        this.userRepository = userRepository;
        this.request = request;
    }

    public User getCurrentUser() {

        String userIdHeader = request.getHeader("X-User-Id");

        if (userIdHeader == null) {
            throw new RuntimeException("User not logged in");
        }

        Long userId = Long.parseLong(userIdHeader);

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}


