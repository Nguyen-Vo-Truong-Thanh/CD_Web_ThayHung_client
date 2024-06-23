package vn.edu.hcmuaf.nvtt.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
@Getter
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private int quantity;
    private BigDecimal price;
    private String category;

}