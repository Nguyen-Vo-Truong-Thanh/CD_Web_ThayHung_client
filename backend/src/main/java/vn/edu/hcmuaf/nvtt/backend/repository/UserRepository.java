package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
        public UserEntity findByEmail(String username);
        Optional<UserEntity> findByEmailAndPassword(String username, String password);
        @Query("select u from UserEntity u  where u.email = :email")
        Optional<UserEntity> findEmail(@Param("email") String email);
}
