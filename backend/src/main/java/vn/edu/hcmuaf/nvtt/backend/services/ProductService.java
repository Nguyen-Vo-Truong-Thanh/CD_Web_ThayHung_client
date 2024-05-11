package vn.edu.hcmuaf.nvtt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;
import vn.edu.hcmuaf.nvtt.backend.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    @Autowired

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public List<Product> getAllProducts() {
        return productRepository.findGetAll();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByProductCategory(categoryId);
    }

    public List<Product> getProductByStatus (String status){
        return productRepository.findByProductStatus(status);
    }

    public  List<Product> getProductsByDiscount(int discount){
        return productRepository.findByProductDiscount(discount);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByProductNameContainingIgnoreCase(keyword);
    }
}