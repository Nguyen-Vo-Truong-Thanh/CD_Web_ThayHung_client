package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import vn.edu.hcmuaf.nvtt.backend.dto.OrderDto;
import vn.edu.hcmuaf.nvtt.backend.entity.OrderEntity;

import java.util.List;
import java.util.Optional;

@Repository

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserId(Long userId);
    @Query("SELECT new vn.edu.hcmuaf.nvtt.backend.dto.OrderDto(o.id, p.name, u.email, u.phoneNumber, o.price, u.address, o.orderStatus) " +
            "FROM UserEntity u " +
            "JOIN OrderEntity o ON u.id = o.user.id " +
            "JOIN Product p ON o.product.id = p.id")
    List<OrderDto> getAllOrder();

    @Query("SELECT new vn.edu.hcmuaf.nvtt.backend.dto.OrderDto(o.id, p.name, u.email, u.phoneNumber, o.price, u.address, o.orderStatus) " +
            "FROM UserEntity u " +
            "JOIN OrderEntity o ON u.id = o.user.id " +
            "JOIN Product p ON o.product.id = p.id " +
            "WHERE o.id = :id")
    OrderDto findByIdDto(@Param("id") int id);
    Optional<OrderEntity> findById(@Param("id") Long id);
}