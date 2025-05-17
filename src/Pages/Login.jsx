import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";

axios.defaults.withCredentials = true; // allows cookies from PHP backend

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

  // Check if user is already logged in
  useEffect(() => {
    axios
      .get("http://localhost/breics-backend/process_login.php")
      .then((res) => {
        if (res.data.loggedIn) {
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => console.error("Session check failed:", err));
  }, []);

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
      const url = isLogin
        ? "http://localhost/breics-backend/process_login.php"
        : "http://localhost/breics-backend/process_signup.php";

      const form = new FormData();
      if (isLogin) {
        form.append("email", formData.email);
        form.append("password", formData.password);
      } else {
        form.append("firstName", formData.firstName);
        form.append("lastName", formData.lastName);
        form.append("phone", formData.phone);
        form.append("email", formData.email);
        form.append("password", formData.password);
      }

      const response = await axios.post(url, form);

      if (response.data.success) {
        window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Invalid credentials or server error.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <button className="go-back" onClick={() => (window.location.href = "/")}>
          ← Go back
        </button>
        <h2>{isLogin ? "Sign in to Breics" : "Create a Breics account"}</h2>
        <div className="tabs">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Log In
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Sign Up
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
