import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

axios.defaults.withCredentials = true;

const Login = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    country_code: "+234",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    account_type: "resident",
    accept_terms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleToggle = (tab) => {
    setMode(tab);
    setFormData({
      first_name: "",
      last_name: "",
      country_code: "+234",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
      account_type: "resident",
      accept_terms: false,
    });
    setError("");
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
    setLoading(true);
  
    try {
      if (isLogin) {
        const res = await axios.post("https://breics.onrender.com/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
  
        const { status, token, user_id } = res.data;
  
        if (status === "success") {
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          window.location.href = "/dashboard";
        } else {
          setError("Login failed.");
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          ...formData,
          accept_terms: formData.accept_terms ? "1" : "0",
        });
  
        const { status, message } = res.data;
  
        if (status === "success") {
          alert(message);
          setMode("login");
        } else {
          setError(message);
        }
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => handleToggle("login")}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => handleToggle("register")}
          >
            Register
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="two-inputs">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />

              <select
                name="account_type"
                value={formData.account_type}
                onChange={handleChange}
                required
              >
                <option value="resident">Resident</option>
                <option value="landlord">Landlord</option>
                {/* <option value="agent">Agent</option>
                <option value="control">Admin</option> */}
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="accept_terms"
                  checked={formData.accept_terms}
                  onChange={handleChange}
                />
                I agree to the Terms and Conditions
              </label>
            </>
          )}

          {!isLogin && (
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <div className="spinner" /> : "Register"}
            </button>
          )}

          {isLogin && (
            <>
              <a href="/reset-password" className="forgot-password">
                Forgot password?
              </a>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <div className="spinner" /> : "Login"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
