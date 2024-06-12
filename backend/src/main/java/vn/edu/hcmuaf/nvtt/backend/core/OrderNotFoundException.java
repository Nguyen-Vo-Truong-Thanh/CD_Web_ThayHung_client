package vn.edu.hcmuaf.nvtt.backend.core;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String message) {
        super(message);
    }
}