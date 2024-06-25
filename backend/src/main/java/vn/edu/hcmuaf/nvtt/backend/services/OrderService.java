package vn.edu.hcmuaf.nvtt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.nvtt.backend.dto.OrderDto;

import vn.edu.hcmuaf.nvtt.backend.entity.OrderEntity;
import vn.edu.hcmuaf.nvtt.backend.repository.OrderRepository;

import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderDto findByIdDto(int id) {
        return orderRepository.findByIdDto(id);
    }

    public boolean updateOrderStatus(Long id, int newStatus) {
        Optional<OrderEntity> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            OrderEntity order = optionalOrder.get();
            order.setOrderStatus(newStatus);
            orderRepository.save(order);
            return true;
        }
        return false;
    }
}