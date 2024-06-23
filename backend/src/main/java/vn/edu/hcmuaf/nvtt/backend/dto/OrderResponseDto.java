package vn.edu.hcmuaf.nvtt.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
@Builder
@Getter
public class OrderResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private String paymentMethod;
    private String phoneNumber;
    private String email;
    private BigDecimal price;
    @JsonProperty(value = "product")
    private ProductDto productDto;

}
