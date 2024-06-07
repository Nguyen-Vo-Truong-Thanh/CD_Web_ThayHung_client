package vn.edu.hcmuaf.nvtt.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginRequest;
import vn.edu.hcmuaf.nvtt.backend.payload.LoginResponse;
import vn.edu.hcmuaf.nvtt.backend.services.EmailService;
import vn.edu.hcmuaf.nvtt.backend.services.UserServiceImpl;

import java.util.Map;

@RestController

public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        UserEntity entity = userService.findById(id);
        return ResponseEntity.ok(entity);
    }

    @PostMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword(@RequestBody Map<String, String> credentials) {
        if (credentials == null || !credentials.containsKey("email")) {
            return ResponseEntity.badRequest().body("Missing email field");
        }

        String email = credentials.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is empty");
        }

        boolean result = userService.checkEmail(email);
        if (result) {
            return ResponseEntity.ok("Reset password email sent");
        }else {
            return ResponseEntity.badRequest().body("Email not found");
        }
    }
    @PostMapping("/getRole")
    public Long getUserRole(@RequestBody LoginResponse request) {
        return userService.getRole(request.getEmail());
    }
}