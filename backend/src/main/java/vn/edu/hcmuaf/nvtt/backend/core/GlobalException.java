package vn.edu.hcmuaf.nvtt.backend.core;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.function.EntityResponse;

@RestControllerAdvice
public class GlobalException {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handlingGlobalException(Exception ex){
//        return ResponseEntity.internalServerError().body("Loi roi");
//    }

}
