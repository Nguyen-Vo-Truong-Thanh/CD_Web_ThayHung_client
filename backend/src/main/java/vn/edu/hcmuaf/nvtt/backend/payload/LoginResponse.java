package vn.edu.hcmuaf.nvtt.backend.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String email;
    private String password;
    private String phoneNumber;

}
