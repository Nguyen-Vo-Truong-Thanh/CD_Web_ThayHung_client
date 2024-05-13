package vn.edu.hcmuaf.nvtt.backend.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import vn.edu.hcmuaf.nvtt.backend.core.UserNotFoundException;
import vn.edu.hcmuaf.nvtt.backend.payload.*;

public interface UserService extends UserDetailsService {
    public LoginResponse login(LoginRequest loginRequest) throws UserNotFoundException;
    RegisterResponse register(RegisterRequest registerRequest);
    void forgotPassword(String email) throws Exception;

    void resetPassword(ResetPasswordRequest request);

}
