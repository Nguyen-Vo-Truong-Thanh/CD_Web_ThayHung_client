package vn.edu.hcmuaf.nvtt.demo.services;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.demo.core.UserNotFoundException;
import vn.edu.hcmuaf.nvtt.demo.mapper.AuthMapper;
import vn.edu.hcmuaf.nvtt.demo.payload.*;
import vn.edu.hcmuaf.nvtt.demo.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.demo.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final AuthMapper authmapper;


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
        UserEntity userEntity = authmapper.registerRequestToUser(registerRequest);
        userRepository.save(userEntity);
        RegisterResponse response = authmapper.userToRegisterResponse(userEntity);
        return response;
    }

    @Override
    public void forgotPassword(String email) throws Exception {

    }

    @Override
    public void resetPassword(PasswordResetRequest request) {

    }
}
