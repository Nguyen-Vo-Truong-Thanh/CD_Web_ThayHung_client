package vn.edu.hcmuaf.nvtt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.nvtt.backend.entity.Childs;

@Repository
public interface ChildsRepository extends JpaRepository<Childs, Long> {
}
