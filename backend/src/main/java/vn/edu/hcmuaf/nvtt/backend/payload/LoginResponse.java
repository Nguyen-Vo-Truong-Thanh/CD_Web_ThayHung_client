package vn.edu.hcmuaf.nvtt.backend.payload;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String email;
    private String fullName;
    private String phoneNumber;
    private int enabled;
    private Long id;
}
