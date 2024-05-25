import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "./style/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Resetpassword() {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch('http://localhost:8080/users/forgetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await result.json();
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
            setResponse('An error occurred. Please try again.');
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    {response && <div className="response">{response ? 'Mật khẩu mới đã được cấp' : 'An error occurred. Please try again.'}</div>}

                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title p-b-26">
                            Lấy lại mật khẩu
                        </span>
                        <span className="login100-form-title p-b-48">
                            <i className="zmdi zmdi-font"></i>
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input
                                className="input100"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn">
                                    Gửi
                                </button>
                            </div>
                        </div>


                        <div className="text-center p-t-115">
                            <Link className="txt2" to="/register">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Resetpassword;
