import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch('/api/orders/user') // Gửi yêu cầu lấy danh sách đơn hàng của người dùng hiện tại
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching order history:', error));
  }, []);

  const handleViewOrder = (orderId) => {
    history.push(`/orderDetail/${orderId}`); // Điều hướng tới trang chi tiết đơn hàng với id tương ứng
  };

  return (
    <div className="order-history-container">
      <h2>Lịch sử đơn hàng</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Product Name</th>
            <th>Address</th>
            <th>Price</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.firstName}</td>
              <td>{order.lastName}</td>
              <td>{order.nameProduct}</td>
              <td>{order.address}</td>
              <td>{order.price}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.status}</td>
              <td>{new Date(order.timestamp).toLocaleString()}</td>
              <td>{order.notes}</td>
              <td>
                <button onClick={() => handleViewOrder(order.id)}>Xem đơn hàng</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
