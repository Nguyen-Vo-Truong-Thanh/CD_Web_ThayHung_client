package vn.edu.hcmuaf.nvtt.backend.dto;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ProductUpdateRequest {
  private Long id;
  private String name;
  private String imageUrl;
  private String description;
  private BigDecimal price;
  private String category;
}
