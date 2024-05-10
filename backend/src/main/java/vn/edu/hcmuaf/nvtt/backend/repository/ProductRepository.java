package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;


import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT P  FROM Product P ")
    public List<Product> findGetAll();

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    List<Product> findByProductCategory(Long categoryId);

//    @Query("SELECT p FROM Product p WHERE p.status = :status")
//    List<Product> findByProductStatus(String status);
}
