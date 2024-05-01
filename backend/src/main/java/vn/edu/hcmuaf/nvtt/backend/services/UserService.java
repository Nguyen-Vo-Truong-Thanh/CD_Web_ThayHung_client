package vn.edu.hcmuaf.nvtt.backend.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;

public interface UserService extends UserDetailsService {
    public LoginResponse login(LoginRequest loginRequest);
}
