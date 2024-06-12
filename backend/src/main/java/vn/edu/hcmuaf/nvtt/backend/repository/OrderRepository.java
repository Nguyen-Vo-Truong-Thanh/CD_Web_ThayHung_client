package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import vn.edu.hcmuaf.nvtt.backend.entity.OrderEntity;

@Repository

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}