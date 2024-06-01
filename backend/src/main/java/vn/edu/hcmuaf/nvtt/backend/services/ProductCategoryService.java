package vn.edu.hcmuaf.nvtt.backend.services;

import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.entity.ProductCategory;
import vn.edu.hcmuaf.nvtt.backend.model.ProductCategoryDto;
import vn.edu.hcmuaf.nvtt.backend.repository.ProductCategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductCategoryService {

    private final ProductCategoryRepository _repository;

    public ProductCategoryService(ProductCategoryRepository repository) {
        _repository = repository;
    }

    public ProductCategoryDto getById(Long id) {
        var result = new ProductCategoryDto();
        var optionalData = _repository.findById(id);

        if (optionalData.isPresent()) {
            var data = optionalData.get();
            result.setId(data.getId());
            result.setName(data.getName());
        }

        return result;
    }

    public List<ProductCategoryDto> get() {
        var result = new ArrayList<ProductCategoryDto>();

        var data = _repository.findAll();
        if(data != null) {
            for (var o:data ) {
                var dto = new ProductCategoryDto();
                dto.setId(o.getId());
                dto.setName(o.getName());
                result.add(dto);
            }
        }

        return result;
    }
}