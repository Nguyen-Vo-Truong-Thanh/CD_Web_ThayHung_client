package vn.edu.hcmuaf.nvtt.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.entity.ProductCategory;
import vn.edu.hcmuaf.nvtt.backend.payload.model.ProductCategoryDto;
import vn.edu.hcmuaf.nvtt.backend.services.ProductCategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/product-category")
public class ProductCategoryController {

    @Autowired
    private final ProductCategoryService _service;

    @Autowired
    public ProductCategoryController(ProductCategoryService service) {
        this._service = service;
    }
    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return _service.findAll();
    }
    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<ProductCategoryDto> data = _service.get();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/getItem")
    public ResponseEntity<?> getItem(@RequestParam("id") Long id) {
        ProductCategoryDto data = _service.getById(id);
        return ResponseEntity.ok(data);
    }
}
