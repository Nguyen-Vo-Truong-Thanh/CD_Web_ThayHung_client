import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "./style/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@mui/material';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerRequest = {
            email,
            password,
            fullName,
            phoneNumber,
            address
        };

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerRequest),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Đăng ký thành công!');

            } else {
                alert('Đăng ký thất bại!');

            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
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
                            <span className="focus-input100" data-placeholder="Password"></span>
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
