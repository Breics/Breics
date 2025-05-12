import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");

  const toggleMode = () => {
    setError("");
    setIsLogin(!isLogin);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        return setError("Passwords do not match.");
      }
      if (!formData.agree) {
        return setError("You must agree to the terms.");
      }
    }

    try {
      const url = isLogin ? "/api/login" : "/api/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, payload);

      if (response.data.success) {
        // Store JWT token in local storage or state
        localStorage.setItem('authToken', response.data.token);
        window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <button
          className="go-back"
          onClick={() => (window.location.href = "/")}
        >
          ← Go back
        </button>
        <h2>Sign in to Breics</h2>
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="two-inputs">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                I agree to the terms and conditions
              </label>
            </>
          )}

          {isLogin && (
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          )}
          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="submit-btn">
            {isLogin ? "Sign in and continue" : "Create my Breics account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
