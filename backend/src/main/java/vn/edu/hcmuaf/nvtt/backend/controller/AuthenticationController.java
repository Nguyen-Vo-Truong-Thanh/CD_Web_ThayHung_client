package vn.edu.hcmuaf.nvtt.backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmuaf.nvtt.backend.handler.HttpResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.*;
import vn.edu.hcmuaf.nvtt.backend.services.UserService;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<HttpResponse> login(@RequestBody LoginRequest loginRequest)  {
        LoginResponseV2 loginResponseV2 = userService.loginV2(loginRequest);

        return ResponseEntity.ok().body(HttpResponse.success(loginResponseV2, "Login successfully"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register( @RequestBody RegisterRequest registerRequest) throws  Exception
    {
        RegisterResponse registerResponse =userService.registerV2(registerRequest);
        return ResponseEntity.ok().body(HttpResponse.success(registerResponse," Register successfully"));
    }

}
