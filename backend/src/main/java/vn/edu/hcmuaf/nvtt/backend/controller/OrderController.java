package vn.edu.hcmuaf.nvtt.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.nvtt.backend.core.OrderNotFoundException;
import vn.edu.hcmuaf.nvtt.backend.dto.OrderDto;
import vn.edu.hcmuaf.nvtt.backend.dto.OrderRequest;
import vn.edu.hcmuaf.nvtt.backend.dto.OrderResponseDto;
import vn.edu.hcmuaf.nvtt.backend.dto.ProductDto;
import vn.edu.hcmuaf.nvtt.backend.entity.OrderEntity;
import vn.edu.hcmuaf.nvtt.backend.entity.Product;
import vn.edu.hcmuaf.nvtt.backend.entity.UserEntity;
import vn.edu.hcmuaf.nvtt.backend.repository.OrderRepository;
import vn.edu.hcmuaf.nvtt.backend.repository.ProductRepository;
import vn.edu.hcmuaf.nvtt.backend.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@RequestBody OrderRequest request,  HttpSession session) {
        OrderEntity order = OrderRequest.toEntity(request);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("product not found"));
        UserEntity userEntity = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("id not found"));

        order.setProduct(product);
        order.setUser(userEntity);
        System.out.println("OK: "+session.getAttribute("User"));
        if (!ObjectUtils.isEmpty(session.getAttribute("User")))
            order.setUser((UserEntity) session.getAttribute("User"));
        OrderEntity savedOrder = orderRepository.save(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable Long id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        return ResponseEntity.ok(order);
    }

    @GetMapping("/users/{userId}") //api order detail
    public ResponseEntity<List<OrderResponseDto>> getOrderByUserId(@PathVariable Long userId) {
        List<OrderEntity> orders = orderRepository.findByUserId(userId);
        List<OrderResponseDto> result = orders.stream().map(entity -> {
            Product productEntity = entity.getProduct();
            ProductDto productDto = ProductDto.builder()
                    .name(productEntity.getName())
                    .imageUrl(productEntity.getImageUrl())
                    .description(productEntity.getDescription())
                    .build();

            return OrderResponseDto.builder()
                    .id(entity.getId())
                    .email(entity.getEmail())
                    .firstName(entity.getFirstName())
                    .lastName(entity.getLastName())
                    .address(entity.getAddress())
                    .phoneNumber(entity.getPhoneNumber())
                    .paymentMethod(entity.getPaymentMethod())
                    .price(entity.getPrice())
                    .productDto(productDto)
                    .build();
        }).toList();
        return ResponseEntity.ok(result);
    }
    @GetMapping("/listProduct")
    public List<ProductDto>productDtos(){
        return productRepository.getAllBy();
    }
    @GetMapping("/listOrder")
    public  List<OrderDto>orderDtos(){
        return orderRepository.getAllOrder();
    }
}
