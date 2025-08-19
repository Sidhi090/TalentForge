import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../Pages/Auth/login.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="login-page-container">
      <div className="login-page-background">
        <div className="login-page-pattern"></div>
        <div className="login-page-decoration">
          <div className="decor-leaf decor-leaf-1"></div>
          <div className="decor-leaf decor-leaf-2"></div>
        </div>
      </div>

      <div className="login-page-card">
        <div className="login-page-header">
          <div className="login-logo-container">
            <svg className="login-logo-icon" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
            <h1>Welcome Back <span className="login-page-logo">
                <br></br>
                Talent Forge</span></h1>
          </div>
          <p className="login-page-subtitle">Sign in to continue your professional journey</p>
        </div>

        <form onSubmit={handleSubmit} className="login-page-form">
          <div className="login-page-form-group">
            <label htmlFor="login-email">Email</label>
            <div className="input-container">
              <input
                type="email"
                id="login-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="login-input"
              />
            </div>
          </div>

          <div className="login-page-form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-container">
              <input
                type="password"
                id="login-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="login-input"
              />
            </div>
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="remember-me-checkbox"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-page-submit-button">
            Sign In
            <svg className="login-page-button-icon" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <div className="login-page-signup-prompt">
            Don't have an account? <Link to="/signup" className="login-page-signup-link"
            onClick={() => console.log('Redirect to signup')}>
            
            Sign up</Link>
          </div>

          <div className="login-divider">
            <span className="divider-line"></span>
            <span className="divider-text">or continue with</span>
            <span className="divider-line"></span>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default Login;