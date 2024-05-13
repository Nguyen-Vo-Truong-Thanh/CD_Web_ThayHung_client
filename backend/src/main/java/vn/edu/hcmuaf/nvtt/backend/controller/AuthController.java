package vn.edu.hcmuaf.nvtt.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.handler.HttpResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.RegisterResponse;
import vn.edu.hcmuaf.nvtt.backend.services.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController extends CustomExceptionHandler{
//        private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<HttpResponse> login(@RequestBody LoginRequest loginRequest) throws Exception{
        LoginResponse loginResponse = userService.login(loginRequest);
//        Authentication authentication =authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok().body(HttpResponse.success(loginResponse,"Login successfully"));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return  ResponseEntity.ok().body(("hello"));
    }
    @PostMapping("/register")
    public ResponseEntity<?> register( @RequestBody RegisterRequest registerRequest) throws  Exception
    {
        RegisterResponse registerResponse = userService.register(registerRequest);
        return ResponseEntity.ok().body(HttpResponse.success(registerResponse," Register successfully"));
    }



}
