import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "./style/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@mui/material';
function Register() {

    return (
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form">
                        <span class="login100-form-title p-b-26">
                            Đăng ký
                        </span>
                        <span class="login100-form-title p-b-48">
                            <i class="zmdi zmdi-font"></i>
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input class="input100" type="text" name="email" />
                            <span class="focus-input100" data-placeholder="Email"></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter password">
                            <span class="btn-show-pass">
                                <i class="zmdi zmdi-eye"></i>
                            </span>
                            <input class="input100" type="password" name="pass" />
                            <span class="focus-input100" data-placeholder="Password"></span>
                        </div>
                        <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input class="input100" type="text" name="text" />
                            <span class="focus-input100" data-placeholder="Họ và tên"></span>
                        </div>
                        <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input class="input100" type="text" name="text" />
                            <span class="focus-input100" data-placeholder="Số điện thoại"></span>
                        </div>
                        <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input class="input100" type="text" name="text" />
                            <span class="focus-input100" data-placeholder="Địa chỉ"></span>
                        </div>

                        <div class="container-login100-form-btn">
                            <div class="wrap-login100-form-btn">
                                <div class="login100-form-bgbtn"></div>
                                <button class="login100-form-btn">
                                    Đăng ký
                                </button>
                            </div>
                        </div>

                        <div class="text-center p-t-115">
                            <span class="txt1">
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