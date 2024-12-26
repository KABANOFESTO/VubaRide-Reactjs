import React, { useState } from 'react';
import '../css/loginOut.css';
import logo from '../assets/images/logooo.png'

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!fullName.trim() || fullName.trim().length < 2) {
            errors.fullName = 'Full name must be at least 2 characters';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!password || password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!termsAccepted) {
            errors.terms = 'You must agree to the terms and conditions';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8081/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: fullName,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccessMessage(data.message || 'Registration successful!');
            setTimeout(() => {
                window.location.href = '/'; // Redirect after success
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6 form-container">
                    <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                        <div className="logo mt-5 mb-3">
                            <a href="/">
                                <img src={logo} width="150px" alt="Logo" />
                            </a>
                        </div>
                        <div className="heading mb-3">
                            <h4>Create an account</h4>
                        </div>
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                        <form id="signupForm" onSubmit={handleSubmit}>
                            <div className="form-input">
                                <span><i className="fas fa-user"></i></span>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    required
                                />
                                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                            </div>
                            <div className="form-input">
                                <span><i className="fas fa-envelope"></i></span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    required
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>
                            <div className="form-input">
                                <span><i className="fas fa-lock"></i></span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 d-flex">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cb1"
                                            checked={termsAccepted}
                                            onChange={() => setTermsAccepted(!termsAccepted)}
                                            required
                                        />
                                        <label className="custom-control-label text-white" htmlFor="cb1">I agree to all terms & conditions</label>
                                    </div>
                                    {errors.terms && <div className="error-message">{errors.terms}</div>}
                                </div>
                            </div>
                            <div className="text-left mb-3">
                                <button type="submit" className="btn" id="submitButton" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                            <div className="text-white mb-3">or register with</div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <a href="#" className="btn btn-block btn-social btn-facebook">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a href="#" className="btn btn-block btn-social btn-google">
                                        <i className="fab fa-google"></i>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a href="#" className="btn btn-block btn-social btn-twitter">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="text-white">Already have an account? <a href='/login' className="login-link">Login here</a></div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>
            </div>
        </div>
    );
};

export default Register;
