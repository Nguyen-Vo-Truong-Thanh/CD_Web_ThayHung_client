package vn.edu.hcmuaf.nvtt.backend.core;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(String message) {
        super(message);
    }
}