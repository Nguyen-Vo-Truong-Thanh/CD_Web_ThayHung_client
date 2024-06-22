package vn.edu.hcmuaf.nvtt.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "order_entity")
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private String nameProduct;
    private BigDecimal price;
    @Column(name = "order_status", nullable = false, columnDefinition = "int default 0")
    private int orderStatus = 0;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
