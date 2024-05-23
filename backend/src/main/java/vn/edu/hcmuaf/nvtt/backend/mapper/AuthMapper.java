package vn.edu.hcmuaf.nvtt.demo.mapper;

import org.mapstruct.Mapper;
import vn.edu.hcmuaf.nvtt.demo.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.demo.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.demo.payload.RegisterRequest;
import vn.edu.hcmuaf.nvtt.demo.payload.RegisterResponse;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    UserEntity registerRequestToUser(RegisterRequest registerRequest) ;
    RegisterResponse userToRegisterResponse(UserEntity user);
    LoginResponse userToLoginResponse(UserEntity userEntity);




}
