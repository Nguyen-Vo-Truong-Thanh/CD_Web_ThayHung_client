package vn.edu.hcmuaf.nvtt.backend.dto;

import lombok.Builder;
import lombok.Data;
import vn.edu.hcmuaf.nvtt.backend.entity.OrderEntity;

import java.math.BigDecimal;

@Data
@Builder
public class OrderRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String address;
    private String paymentMethod;
    private BigDecimal price;
    private Long productId;
    private Long userId;

    public static OrderEntity toEntity(OrderRequest request) {
        return OrderEntity.builder()
                .address(request.getAddress())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .price(request.getPrice())
                .paymentMethod(request.getPaymentMethod())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus(0)
                .build();
    }
}
