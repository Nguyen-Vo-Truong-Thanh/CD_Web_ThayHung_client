package vn.edu.hcmuaf.nvtt.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponseV2 {
    private String token;
}
