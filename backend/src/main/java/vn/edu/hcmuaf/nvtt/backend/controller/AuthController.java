package vn.edu.hcmuaf.nvtt.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.handler.HttpResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterResponse;
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
    public ResponseEntity<HttpResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
        LoginResponse loginResponse = userService.login(loginRequest);
        return ResponseEntity.ok().body(HttpResponse.success(loginResponse, "Login successfully"));
    }


    @PostMapping("/register")
    public ResponseEntity<?> register( @RequestBody RegisterRequest registerRequest) throws  Exception
    {
        RegisterResponse registerResponse =service.register(registerRequest);
        return ResponseEntity.ok().body(HttpResponse.success(registerResponse," Register successfully"));
    }
    @GetMapping("/hello")
    @Operation(summary = "Get hello message")
    public String hello() {
        return "Hello, World!";
    }

}