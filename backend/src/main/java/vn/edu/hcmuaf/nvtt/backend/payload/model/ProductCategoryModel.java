package vn.edu.hcmuaf.nvtt.backend.payload.model;

public class ProductCategoryModel {
    private Long id;
    private String name;

    public ProductCategoryModel() {
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
