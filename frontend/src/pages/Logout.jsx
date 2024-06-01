import React from 'react';
import { useHistory } from 'react-router-dom';
import "./style/Logout.css";

const Logout = () => {
  const history = useHistory();

  const handleLogout = async () => {
    // Xóa dữ liệu email, fullname và phonenumber khỏi sessionStorage
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('fullName');
    sessionStorage.removeItem('phone_number');

    // Xóa dữ liệu đăng nhập khỏi sessionStorage hoặc localStorage
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    // Điều hướng người dùng đến trang đăng nhập hoặc trang chính của ứng dụng
    history.push('/');
  };

  return (
    <div className='logout'>
      <h1>Đăng xuất</h1>
      <p>Bạn có chắc chắn muốn đăng xuất?</p>
      <button className='btn btn-primary' onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default Logout;
