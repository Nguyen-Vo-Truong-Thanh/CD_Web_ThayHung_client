package vn.edu.hcmuaf.nvtt.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;
import vn.edu.hcmuaf.nvtt.backend.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  @Autowired
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/allProduct")

    public ResponseEntity<?> getAllProducts() {
        List<Product> productList = productService.getAllProducts();
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/productByCategory")
    public ResponseEntity<?> getProductsByCategory(@RequestParam("categoryId") Long categoryId) {
        List<Product> productList = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/productByStatus")
    public ResponseEntity<?> getProductByStatus(@RequestParam("status") String status) {
        List<Product> productList = productService.getProductByStatus(status);
        return ResponseEntity.ok(productList);
    }


    @GetMapping("/productByDiscount")
    public ResponseEntity<?> getProductByDiscount(@RequestParam("discount") int discount){
        List<Product> productList = productService.getProductsByDiscount(discount);
        return ResponseEntity.ok(productList);

    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam("keyword") String keyword) {
        List<Product> productList = productService.searchProducts(keyword);
        return productList;
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Product>> getProductByPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        Page<Product> productPage = productService.getProductByPage(page, size);
        return ResponseEntity.ok(productPage);
    }

    @GetMapping("/byCategory")
    public ResponseEntity<?> getByCategory(@RequestParam("id") Long id) {
        List<Product> data = productService.getProductsByCategory(id);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/byStatus")
    public ResponseEntity<?> getByStatus(@RequestParam("status") String status) {
        List<Product> data = productService.getProductByStatus(status);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/byDiscount")
    public ResponseEntity<?> getByDiscount(@RequestParam("discount") String discount) {
        List<Product> data = productService.getProductsByDiscount(Integer.parseInt(discount));
        return ResponseEntity.ok(data);
    }


}

