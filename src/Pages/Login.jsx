import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

axios.defaults.withCredentials = true;

const Login = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    account_type: "resident",
    accept_terms: false,
    companyDetails: {
      name: "",
      registrationNumber: "",
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleToggle = (tab) => {
    setMode(tab);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      account_type: "resident",
      accept_terms: false,
      companyDetails: {
        name: "",
        registrationNumber: "",
      },
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name.startsWith("companyDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        companyDetails: {
          ...prev.companyDetails,
          [field]: val,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: val,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(
          "https://breics-backend.onrender.com/api/landlords/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
      
        const { success, data } = res.data;
      
        if (success) {
          const { token, landlord } = data;
      
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", landlord.id);
          localStorage.setItem("first_name", landlord.firstName);
          localStorage.setItem("user", JSON.stringify(landlord)); // Save entire user object
      
          window.location.href = "/verify"; // or "/verify" if that's the correct route
        } else {
          setError("Login failed.");
        }
      } else {
        const requiredFields = [
          "firstName",
          "lastName",
          "phoneNumber",
          "email",
          "password",
          "confirmPassword",
        ];

        for (let field of requiredFields) {
          if (!formData[field]) {
            setError(`Please fill out the ${field} field.`);
            setLoading(false);
            return;
          }
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        if (!formData.accept_terms) {
          setError("You must accept the Terms and Conditions.");
          setLoading(false);
          return;
        }

        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword, // ✅ Important
          phoneNumber: formData.phoneNumber,
          companyDetails: {
            name:
              formData.account_type === "landlord"
                ? formData.companyDetails?.name || ""
                : "N/A",
            registrationNumber:
              formData.account_type === "landlord"
                ? formData.companyDetails?.registrationNumber || ""
                : "N/A",
          },
        };

        console.log("Register Payload:", payload); // 🔍 Debug

        const res = await axios.post(
          "https://breics-backend.onrender.com/api/landlords/register",
          payload
        );
        console.log("API Response:", res);

        const { success, data } = res.data;

        if (success) {
          alert("Registration successful! Please log in.");
          setMode("login");
        } else {
          console.log("Backend response not success:", res.data);
          setError(
            res.data.message || res.data.error || "Registration failed."
          );
        }
      }
    } catch (err) {
      console.error("API Error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again.");
      }
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
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
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
              </select>

              {formData.account_type === "landlord" && (
                <>
                  <input
                    type="text"
                    name="companyDetails.name"
                    placeholder="Company Name"
                    value={formData.companyDetails.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="companyDetails.registrationNumber"
                    placeholder="Registration Number"
                    value={formData.companyDetails.registrationNumber}
                    onChange={handleChange}
                    required
                  />
                </>
              )}
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
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <div className="spinner" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>

          {isLogin && (
            <a href="/reset-password" className="forgot-password">
              Forgot password?
            </a>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
