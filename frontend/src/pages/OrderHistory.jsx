import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // const token = sessionStorage.getItem('token');

    const userId = sessionStorage.getItem('userId');
    // if (!token || !userId) {
    if (!userId) {
      console.error('Không tìm thấy token hoặc userId');
      return;
    }
    console.log(userId);
    const accessToken = sessionStorage.getItem('accessToken');
    fetch(`http://localhost:8080/api/orders/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ máy chủ');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
      });
  }, []);

  const handleViewOrder = (orderId) => {
    history.push(`/orderDetail/${orderId}`);
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
            <th>Img</th>
            <th>Address</th>
            <th>Price</th>
            <th>Phone Number</th>
            <th>Timestamp</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.firstName}</td>
              <td>{order.lastName}</td>
              <td>{order.product.name}</td>
              <td><img src={order.product.imageUrl} alt={order.product.name} style={{ width: '100px' }} /></td>
              <td>{order.address}</td>
              <td>{order.price}</td>
              <td>{order.phoneNumber}</td>

              <td>{new Date(order.timestamp).toLocaleString()}</td>
              <td>{order.product.description}</td>
              <td>
                {/* <button onClick={() => handleViewOrder(order.id)}>Hủy đơn hàng</button> */}
                Xem đơn hàn
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
