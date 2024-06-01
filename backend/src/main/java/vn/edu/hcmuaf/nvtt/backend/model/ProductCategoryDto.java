package vn.edu.hcmuaf.nvtt.backend.model;

public class ProductCategoryDto {
    private Long id;
    private String name;

    // Constructors, getters, and setters

    public ProductCategoryDto() {}

    public ProductCategoryDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
