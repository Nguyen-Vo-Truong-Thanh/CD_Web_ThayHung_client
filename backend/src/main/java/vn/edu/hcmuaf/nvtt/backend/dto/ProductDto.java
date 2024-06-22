package vn.edu.hcmuaf.nvtt.backend.dto;

import java.math.BigDecimal;

public class ProductDto {
    private String name;
    private String imageUrl;
    private String description;
    private int quantity;
    private BigDecimal price;
    private String category;

    public ProductDto(String name, String imageUrl, String description, int quantity, BigDecimal price, String category) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Getters and setters
}
