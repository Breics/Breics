import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  useEffect(() => {
    // Check if user is already logged in
    axios
      .get("http://localhost/breicsk/backk/check_session.php")
      .then((res) => {
        if (res.data.loggedIn) {
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => console.error("Session check failed:", err));

    // Load remembered email
    const remembered = localStorage.getItem("rememberMe");
    const storedEmail = localStorage.getItem("email");
    if (remembered === "true" && storedEmail) {
      setRememberMe(true);
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
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
    setRememberMe(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "rememberMe") {
      setRememberMe(checked);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setLoading(false);
        return setError("Passwords do not match.");
      }
      if (!formData.agree) {
        setLoading(false);
        return setError("You must agree to the terms.");
      }
    }

    try {
      const url = isLogin
        ? "http://localhost/breicsk/backk/process_login.php"
        : "http://localhost/breicsk/backk/process_signup.php";

      let response;
      if (isLogin) {
        response = await axios.post(
          url,
          {
            email: formData.email,
            password: formData.password,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        const signupForm = new FormData();
        signupForm.append("firstName", formData.firstName);
        signupForm.append("lastName", formData.lastName);
        signupForm.append("phone", formData.phone);
        signupForm.append("email", formData.email);
        signupForm.append("password", formData.password);

        response = await axios.post(url, signupForm);
      }

      if (response.data.success) {
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", formData.email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
        }

        window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Invalid credentials or server error.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
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
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </div>
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            </>
          )}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          {!isLogin && (
            <>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
              <label className="checkbox">
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
                I agree to the terms and conditions
              </label>
            </>
          )}

          {isLogin && (
            <>
              <label className="checkbox">
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={handleChange} />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </>
          )}

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : isLogin ? "Sign in and continue" : "Create my Breics account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
