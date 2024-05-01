package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
        public UserEntity findByUsername(String username);


}
