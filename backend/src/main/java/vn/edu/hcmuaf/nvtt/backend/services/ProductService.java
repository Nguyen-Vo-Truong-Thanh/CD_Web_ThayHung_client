package vn.edu.hcmuaf.nvtt.backend.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.dto.ProductDto;
import vn.edu.hcmuaf.nvtt.backend.dto.ProductUpdateRequest;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;
import vn.edu.hcmuaf.nvtt.backend.entity.ProductCategory;
import vn.edu.hcmuaf.nvtt.backend.mapper.ProductDtoMapper;
import vn.edu.hcmuaf.nvtt.backend.repository.ProductCategoryRepository;
import vn.edu.hcmuaf.nvtt.backend.repository.ProductRepository;


import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductDtoMapper productDtoMapper;




    public List<Product> getAllProducts() {
        return productRepository.findGetAll();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByProductCategory(categoryId);
    }

    public List<Product> getProductByStatus(String status) {
        return productRepository.findByProductStatus(status);
    }

    public List<Product> getProductsByDiscount(int discount) {
        return productRepository.findByProductDiscount(discount);
    }

    public List<Product> searchProducts(String keyword) {
        List<Product> products = productRepository.searchProducts(keyword);
        return products;
    }

    public Page<Product> getProductByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllProducts(pageable);
    }
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public void deleteProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }
    @Transactional
    public void deleteProductByName(String name) {
        Product product = productRepository.findByName(name);
        if (product != null) {
            productRepository.deleteByName(name);
        } else {
            throw new RuntimeException("Product not found with name: " + name);
        }
    }
    public Product updateProduct(Long productId, ProductUpdateRequest newProductData) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(newProductData.getName());
            existingProduct.setDescription(newProductData.getDescription());
            existingProduct.setPrice(newProductData.getPrice());
            existingProduct.setImageUrl(newProductData.getImageUrl());

           ProductCategory existingCategory = productCategoryRepository.findByName(newProductData.getCategory())
                   .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
               existingProduct.setCategory(existingCategory);
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

    public Product getProductById(Long id) {
        return productRepository.findProductById(id);
    }
    public List<ProductDto>list(){
        return productRepository.getAllBy().stream().map(productDtoMapper).toList();
    }

}
