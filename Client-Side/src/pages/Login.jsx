import React, { useState } from 'react';
import axios from 'axios';
import '../css/loginOut.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/images/logooo.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorAlert('');
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/api/users/login', {
                email,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                const { token } = response.data;
                if (token) {
                    localStorage.setItem('authToken', token);

                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = JSON.parse(atob(base64));

                    localStorage.setItem('loginedUser', JSON.stringify({
                        email: jsonPayload.sub,
                        role: jsonPayload.role,
                    }));

                    if (jsonPayload.role === 'ADMIN') {
                        window.location.href = './adminDash.html';
                    } else {
                        window.location.href = './dash1.html';
                    }
                } else {
                    throw new Error('Token not defined in the response.');
                }
            }
        } catch (error) {
            const message = error.response?.status === 401
                ? 'Invalid email or password. Please try again.'
                : error.message || 'An error occurred while logging in. Please try again.';
            setErrorAlert(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6 form-container">
                    <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                        <div className="logo mt-5 mb-3">
                            <a href="./index.html">
                                <img src={logo} width="150px" alt="Logo" />
                            </a>
                        </div>
                        <div className="heading mb-3">
                            <h4>Login into your account</h4>
                        </div>
                        {errorAlert && <div className="alert alert-danger">{errorAlert}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className={`form-input ${emailError ? 'error' : ''}`}>
                                <span><i className="fa fa-envelope"></i></span>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <div className="error-message">{emailError}</div>}
                            </div>
                            <div className={`form-input ${passwordError ? 'error' : ''}`}>
                                <span><i className="fa fa-lock"></i></span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordError && <div className="error-message">{passwordError}</div>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-6 d-flex">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cb1" />
                                        <label className="custom-control-label text-white" htmlFor="cb1">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6 text-right">
                                    <Link to='/forgot' className="forget-link">Forget password</Link>
                                </div>
                            </div>
                            <div className="text-left mb-3">
                                <button
                                    type="submit"
                                    id="submitButton"
                                    className="btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                            <div className="text-white mb-3">or login with</div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <a href="#" className="btn btn-block btn-social btn-facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a href="#" className="btn btn-block btn-social btn-google">
                                        <i className="fa fa-google"></i>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a href="#" className="btn btn-block btn-social btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="text-white">
                                Don't have an account? <Link to='/signup' className="register-link">Register here</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>
            </div>
        </div>
    );
};

export default Login;
