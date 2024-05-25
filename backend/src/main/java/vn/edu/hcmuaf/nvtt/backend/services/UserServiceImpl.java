package vn.edu.hcmuaf.nvtt.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.core.UserNotFoundException;
import vn.edu.hcmuaf.nvtt.backend.mapper.AuthMapper;
import vn.edu.hcmuaf.nvtt.backend.payload.*;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthMapper authMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        return new User(userEntity.getEmail(), userEntity.getPassword(), userEntity.getAuthorities());
    }

    public UserEntity findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws UserNotFoundException {
        UserEntity userEntity = userRepository.findByEmailAndPassword(loginRequest.getUsername(), loginRequest.getPassword())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return authMapper.userToLoginResponse(userEntity);
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        UserEntity userEntity = authMapper.registerRequestToUser(registerRequest);
        userRepository.save(userEntity);
        return authMapper.userToRegisterResponse(userEntity);
    }

    @Override
    public void forgotPassword(String email) throws Exception {
        // Implementation for forgotPassword method
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        // Implementation for resetPassword method
    }

    @Override
    public boolean checkEmail(String email) {
        return userRepository.findEmail(email).isPresent();
    }
}
