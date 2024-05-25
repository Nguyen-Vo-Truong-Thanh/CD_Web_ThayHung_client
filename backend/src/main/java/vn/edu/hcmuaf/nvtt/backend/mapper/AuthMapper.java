package vn.edu.hcmuaf.nvtt.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterResponse;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    AuthMapper INSTANCE = Mappers.getMapper(AuthMapper.class);

    @Mapping(source = "fullName", target = "fullName")
    @Mapping(source = "phone", target = "phoneNumber")
    UserEntity registerRequestToUser(RegisterRequest registerRequest);

    default RegisterResponse userToRegisterResponse(UserEntity userEntity) {
        RegisterResponse response = new RegisterResponse();
        response.setFullName(userEntity.getFullName());
        response.setEmail(userEntity.getEmail());
        response.setPassword(userEntity.getPassword());
        response.setPhone(userEntity.getPhoneNumber());
        return response;
    }
    LoginResponse userToLoginResponse(UserEntity userEntity);




}
