import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/Account.css';
import { Link } from "react-router-dom";

const Account = () => {
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');  

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        const storedFullName = sessionStorage.getItem('fullName');
        const storedPhoneNumber = sessionStorage.getItem('phone_number');  
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storedFullName) {
            setFullName(storedFullName);
        }
        if (storedPhoneNumber) {
            setPhoneNumber(storedPhoneNumber);
        }
    }, []);
    
    useEffect(() => {
        // Sau khi cập nhật state, lưu dữ liệu vào sessionStorage
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('fullName', full_name);
        sessionStorage.setItem('phone_number', phone_number);  
    }, [email, full_name, phone_number]);
    

    return (
        <div id="content">
            <div className="wrapper">
                <div className="form_ctrl">
                    <div className="acc_ctrl m_r12">
                        <h2>Tài khoản</h2>
                        <div className="list_ctrl">
                            <ul>
                                <li className="first active">
                                    <Link to="/account" title="Thông tin tài khoản">Thông tin tài khoản</Link>
                                </li>
                                <li className="first">
                                    <Link to="/order-history" title="historyOrder">Lịch sử đơn hàng</Link>
                                </li>
                                <li className="first">
                                    <Link to="/login" title="login">Đăng nhập</Link>
                                </li>
                                <li className="first">
                                    <Link to="/register" title="register">Đăng ký</Link>
                                </li>
                                <li className="first">
                                    <Link to="/resetpassword" title="Quên mật khẩu">Quên mật khẩu</Link>
                                </li>
                                <li className="first">
                                    <Link to="/logout" title="Đăng xuất">Đăng xuất</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col_1_1">
                        <div id="login" className="frm_content">
                            <h2>Thông tin tài khoản</h2>
                            <form id="form">
                                <div className="input">
                                    <label>
                                        <span className="req">*</span>Email của bạn:
                                    </label>
                                    <input
                                        name="email"
                                        type="text"
                                        value={email}
                                        maxLength="150"
                                        id="acc_email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <small>error</small>
                                </div>
                                <div className="input">
                                    <label htmlFor="acc_fname">
                                        <span className="req">*</span>Họ và tên
                                    </label>
                                    <input
                                        name="full_name"
                                        type="text"
                                        value={full_name}  
                                        maxLength="150"
                                        id="acc_fname"
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    <small>error</small>
                                </div>
                                <div className="input">
                                    <label htmlFor="acc_phoneNumber">
                                        <span className="req">*</span>Điện thoại:
                                    </label>
                                    <input
                                        name="phone_number"
                                        type="tel"
                                        id="acc_phoneNumber"
                                        value={phone_number}  
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <small>error</small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
