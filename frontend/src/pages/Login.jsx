import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "./style/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState(''); // Changed from email to username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginRequest = { username, password }; // Changed from email to username
        console.log(loginRequest);
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                history.push('/Account');

            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleLogin}>
                        <span className="login100-form-title p-b-26">
                            Đăng nhập
                        </span>
                        <span className="login100-form-title p-b-48">
                            <i className="zmdi zmdi-font"></i>
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="Valid username is required">
                            <input
                                className="input100"
                                type="text"
                                name="username" // Changed from email to username
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Changed from setEmail to setUsername
                            />
                            <span className="focus-input100" data-placeholder="Username"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <span className="btn-show-pass">
                                <i className="zmdi zmdi-eye"></i>
                            </span>
                            <input
                                className="input100"
                                type="password"
                                name="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" type="submit" >

                                    Login

                                </button>
                            </div>
                        </div>

                        <div className="text-center p-t-115">
                            <span className="txt1">
                                Don’t have an account?
                            </span>
                            <Link className="txt2" to="/register">
                                Sign Up
                            </Link>
                        </div>
                        <div className="text-center p-t-115">
                            <Link className="txt2" to="/resetpassword">
                                Reset password
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
