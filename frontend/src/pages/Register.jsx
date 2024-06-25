import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./style/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Kiểm tra xem các trường có được điền đầy đủ hay không
        if (!email || !password || !confirmPassword || !fullName || !phoneNumber || !address) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Kiểm tra xem mật khẩu và mật khẩu nhập lại có trùng khớp không
        if (password !== confirmPassword) {
            setError('Mật khẩu không trùng khớp');
            return;
        }

        const registerRequest = {
            email,
            password,
            fullName,
            phoneNumber,
            address,
            role: 1
        };

        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(registerRequest),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Đăng ký thành công!');
                history.push('/login');
            } else {
                const errorData = await response.json();
                if (errorData.message === 'Email already in use') {
                    setError('Email đã tồn tại');
                } else {
                    setError(errorData.message || 'Đăng ký thất bại!');
                }
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleRegister}>
                        <span className="login100-form-title p-b-26">
                            Đăng ký
                        </span>
                        {error && <div className="error-message">{error}</div>}
                        <span className="login100-form-title p-b-48">
                            <i className="zmdi zmdi-font"></i>
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input className="input100" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <span className="btn-show-pass">
                                <i className="zmdi zmdi-eye"></i>
                            </span>
                            <input className="input100" type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="focus-input100" data-placeholder="Mật khẩu"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter confirm password">
                            <input className="input100" type="password" name="confirmPass" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <span className="focus-input100" data-placeholder="Nhập lại mật khẩu"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter full name">
                            <input className="input100" type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <span className="focus-input100" data-placeholder="Họ và tên"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter phone number">
                            <input className="input100" type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <span className="focus-input100" data-placeholder="Số điện thoại"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter address">
                            <input className="input100" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <span className="focus-input100" data-placeholder="Địa chỉ"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn">
                                    Đăng ký
                                </button>
                            </div>
                        </div>

                        <div className="text-center p-t-115">
                            <span className="txt1">
                                Lưu ý điền thông tin thật để thuận tiện việc đổi hàng
                            </span>
                        </div>
                        <div className="text-center p-t-115">
                            <Link className="txt2" to="/login">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
