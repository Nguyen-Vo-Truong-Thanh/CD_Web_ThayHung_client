package vn.edu.hcmuaf.nvtt.backend.payload;

import lombok.Data;

@Data
public class LoginRequest {

    private String username;
    private String password;
}
