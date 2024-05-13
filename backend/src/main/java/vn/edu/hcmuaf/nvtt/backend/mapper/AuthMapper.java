package vn.edu.hcmuaf.nvtt.backend.mapper;

import org.mapstruct.Mapper;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterResponse;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    UserEntity registerRequestToUser(RegisterRequest registerRequest) ;
    RegisterResponse userToRegisterResponse(UserEntity user);

    LoginResponse userToLoginResponse(UserEntity userEntity);


}