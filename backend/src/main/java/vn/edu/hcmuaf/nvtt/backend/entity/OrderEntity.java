package vn.edu.hcmuaf.nvtt.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "order_entity")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String address;
    private String paymentMethod;
    private String nameProduct; // Lưu tên sản phẩm
    private BigDecimal price; // Lưu giá sản phẩm
}
