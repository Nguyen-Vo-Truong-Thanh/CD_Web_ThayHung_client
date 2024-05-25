package vn.edu.hcmuaf.nvtt.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserServiceImpl implements UserService{

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final AuthMapper authmapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    public UserServiceImpl(EmailService emailService, UserRepository userRepository, AuthMapper authmapper) {
        this.emailService = emailService;
        this.userRepository =userRepository;
        this.authmapper = authmapper;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        UserEntity userEntity = userRepository.findByEmail(username);
        return new User(userEntity.getUsername(),userEntity.getPassword(),userEntity.getAuthorities());
    }

    public UserEntity findById(Long id){
        return userRepository.findById(id).orElseThrow(()->{
            throw  new IllegalArgumentException("Not found by id "+id);
        });
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws UserNotFoundException {
        UserEntity userEntity = userRepository.findByEmailAndPassword(loginRequest.getUsername(),loginRequest.getPassword())
                .orElseThrow(()-> new UserNotFoundException("not found user"));
        LoginResponse loginResponse = authmapper.userToLoginResponse(userEntity);
        return loginResponse;
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        System.out.println("RegisterRequest: " + registerRequest);

        UserEntity userEntity = authmapper.registerRequestToUser(registerRequest);
        System.out.println("UserEntity before saving: " + userEntity);

        userRepository.save(userEntity);

        RegisterResponse response = authmapper.userToRegisterResponse(userEntity);
        System.out.println("RegisterResponse: " + response);

        return response;
    }
    @Override
    public void forgotPassword(String email) throws Exception {

    }
    public boolean checkEmail(String email) {
        Optional<UserEntity> userEntity = userRepository.findEmail(email);
        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            String newPassword = emailService.generateRandomPassword();
            user.setPassword(newPassword);
            userRepository.save(user);
            emailService.sendOtpEmail(email, newPassword);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {

    }


}
