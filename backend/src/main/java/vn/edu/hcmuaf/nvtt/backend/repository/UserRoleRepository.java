package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.nvtt.backend.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}