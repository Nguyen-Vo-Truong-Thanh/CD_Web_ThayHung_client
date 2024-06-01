package vn.edu.hcmuaf.nvtt.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterResponse;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    @Mapping(source = "fullName", target = "fullName")
    @Mapping(source = "phoneNumber", target = "phoneNumber")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "address", target = "address")
    UserEntity registerRequestToUser(RegisterRequest registerRequest);

    default RegisterResponse userToRegisterResponse(UserEntity userEntity) {
        RegisterResponse response = new RegisterResponse();
        response.setFullName(userEntity.getFullName());
        response.setEmail(userEntity.getEmail());
        response.setPassword(userEntity.getPassword());
        response.setPhoneNumber(userEntity.getPhoneNumber());
        response.setAddress(userEntity.getAddress());
        return response;
    }

    LoginResponse userToLoginResponse(UserEntity userEntity);

}