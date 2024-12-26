import React, { useState, useEffect } from 'react';
import '../css/ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');
  const [requirements, setRequirements] = useState({
    lengthReq: false,
    upperReq: false,
    lowerReq: false,
    numberReq: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (!tokenParam) {
      setErrorMessage('Invalid or missing reset token');
    } else {
      setToken(tokenParam);
    }
  }, []);

  const validatePassword = (value) => {
    setRequirements({
      lengthReq: value.length >= 8,
      upperReq: /[A-Z]/.test(value),
      lowerReq: /[a-z]/.test(value),
      numberReq: /[0-9]/.test(value),
    });
  };

  const handlePasswordToggle = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  const handleResetPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const isValid = Object.values(requirements).every(Boolean);
    if (!isValid) {
      setErrorMessage('Please meet all password requirements');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 403
            ? 'Invalid or expired reset token'
            : 'Failed to reset password. Please try again.'
        );
      }

      setSuccessMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="card">
      <div className="lock-icon">
        <i className="fas fa-lock"></i>
      </div>
      <h2>Reset Password</h2>
      <p>Enter your new password below</p>

      <div className="input-group">
        <input
          type="password"
          id="password"
          placeholder="New password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        <i
          className="far fa-eye"
          onClick={() => handlePasswordToggle('password')}
        ></i>
      </div>

      <div className="input-group">
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <i
          className="far fa-eye"
          onClick={() => handlePasswordToggle('confirmPassword')}
        ></i>
      </div>

      <div className="requirements">
        {Object.entries(requirements).map(([key, isValid]) => (
          <div
            key={key}
            className={`requirement ${isValid ? 'valid' : ''}`}
          >
            <i className="fas fa-circle"></i>{' '}
            {key === 'lengthReq'
              ? 'At least 8 characters'
              : key === 'upperReq'
                ? 'One uppercase letter'
                : key === 'lowerReq'
                  ? 'One lowercase letter'
                  : 'One number'}
          </div>
        ))}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <button
        onClick={handleResetPassword}
        disabled={!token || !password || !confirmPassword}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
