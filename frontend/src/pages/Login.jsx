import React, { useState } from 'react';
import "./style/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [fullName, setFullName] = useState(''); // State mới để lưu trữ fullName
    const history = useHistory();
    const loginRequest = { username, password };
    const handleLogin = async (event) => {

        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                sessionStorage.setItem('accessToken', data.data.token);

            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error during login:', error);
        }

        console.log(loginRequest);
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(loginRequest)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                sessionStorage.setItem('userInfo', JSON.stringify({
                    id: data.data.id,
                    email: data.data.email,
                    fullName: data.data.fullName,
                    phoneNumber: data.data.phoneNumber
                }));

                sessionStorage.setItem('email', data.data.email);
                sessionStorage.setItem('fullName', data.data.fullName);
                sessionStorage.setItem('phone_number', data.data.phoneNumber);
                sessionStorage.setItem('userId', data.data.id);
                setFullName(data.data.fullName);
                const roleResponse = await fetch('/getRole', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ email: data.data.email })
                });

                if (roleResponse.ok) {
                    const roleData = await roleResponse.json();
                    console.log('Role data:', roleData);
                    sessionStorage.setItem('roleData', JSON.stringify(roleData));
                    // Điều hướng dựa trên vai trò người dùng
                    if (roleData === 1) {
                        history.push('/');
                    } else if (roleData === 2) {
                        history.push('/productAdmin');
                    } else {
                        setError('Invalid user access');
                    }
                } else {
                    const roleErrorData = await roleResponse.json();
                    setError(roleErrorData.message || 'Failed to fetch role');
                }
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
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
