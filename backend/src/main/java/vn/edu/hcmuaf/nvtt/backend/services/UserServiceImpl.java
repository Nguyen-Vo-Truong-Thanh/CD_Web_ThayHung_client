package vn.edu.hcmuaf.nvtt.backend.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.core.UserNotFoundException;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.mapper.AuthMapper;
import vn.edu.hcmuaf.nvtt.backend.payload.*;
import vn.edu.hcmuaf.nvtt.backend.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final AuthMapper authMapper;

    @Autowired
    private final UserRepository userRepository;


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
                .orElseThrow(() -> new UserNotFoundException("Invalid username or password"));
        return authMapper.userToLoginResponse(userEntity);
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {

        logger.info("Registering user with email: {}", registerRequest.getEmail());

        if (userRepository.findByEmail(registerRequest.getEmail()) != null) {
            throw new IllegalArgumentException("Email already in use");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setPassword(registerRequest.getPassword()); // Consider hashing the password
        userEntity.setFullName(registerRequest.getFullName());
        userEntity.setPhoneNumber(registerRequest.getPhoneNumber());
        userEntity.setAddress(registerRequest.getAddress());


        logger.info("Saving user to database...");
        UserEntity savedUser = userRepository.save(userEntity);
        logger.info("User saved with id: {}", savedUser.getId());

        RegisterResponse response = new RegisterResponse();
        response.setEmail(savedUser.getEmail());
        response.setFullName(savedUser.getFullName());
        response.setPhoneNumber(savedUser.getPhoneNumber());


        return response;
    }

    public Long getRole(String email) {
        Long role = 0L;
        Optional<UserEntity> users = userRepository.findByRole(email);
        {
            if (users.isPresent()) {
                role = users.get().getRole().getId();
            } else {
                return role;
            }
        }
        return role;
    }


    @Override
    public void forgotPassword(String email) throws Exception {

    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        // Implementation for resetPassword method
    }

    public boolean checkEmail(String email) {
        return userRepository.findEmail(email).isPresent();
    }
}
