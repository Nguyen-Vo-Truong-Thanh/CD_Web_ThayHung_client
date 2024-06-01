package vn.edu.hcmuaf.nvtt.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;
import vn.edu.hcmuaf.nvtt.backend.model.ProductCategoryDto;
import vn.edu.hcmuaf.nvtt.backend.services.ProductCategoryService;
import vn.edu.hcmuaf.nvtt.backend.services.ProductService;

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