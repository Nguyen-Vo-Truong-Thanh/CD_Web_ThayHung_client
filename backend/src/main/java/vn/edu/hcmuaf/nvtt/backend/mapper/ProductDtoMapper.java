package vn.edu.hcmuaf.nvtt.backend.mapper;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.dto.ProductDto;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;

import java.util.function.Function;
@Component
public class ProductDtoMapper implements Function<Product, ProductDto> {
    @Override
    public ProductDto apply(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory().getName())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .description(product.getDescription())
                .build();
    }
}
