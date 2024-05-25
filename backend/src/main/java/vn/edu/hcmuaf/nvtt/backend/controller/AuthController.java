package vn.edu.hcmuaf.nvtt.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.handler.HttpResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.*;
import vn.edu.hcmuaf.nvtt.backend.services.UserService;
import vn.edu.hcmuaf.nvtt.backend.services.UserServiceImpl;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController extends CustomExceptionHandler{

    private final UserService userService;
    private final UserServiceImpl service;

    @PostMapping("/login")
    public ResponseEntity<HttpResponse> login(@RequestBody LoginRequest loginRequest) throws Exception{
        LoginResponse loginResponse = userService.login(loginRequest);
        return ResponseEntity.ok().body(HttpResponse.success(loginResponse,"Login successfully"));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return  ResponseEntity.ok().body(("hello"));
    }
    @PostMapping("/register")
    public ResponseEntity<?> register( @RequestBody RegisterRequest registerRequest) throws  Exception
    {
        RegisterResponse registerResponse =service.register(registerRequest);
        return ResponseEntity.ok().body(HttpResponse.success(registerResponse," Register successfully"));
    }


}
