package vn.edu.hcmuaf.nvtt.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.services.UserServiceImpl;
import vn.edu.hcmuaf.nvtt.backend.services.UserServiceImpl;

@RestController
@RequestMapping({"/users"})
public class UserController {
    @Autowired
    private UserServiceImpl userService;



    @GetMapping({"/{id}"})
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        UserEntity entity = this.userService.findById(id);
        return ResponseEntity.ok(entity);
    }





}
