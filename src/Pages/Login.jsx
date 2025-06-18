import React, { useState } from "react";
import axios from "axios";
import backgroundImg from "../image/heo.jpg"; // ensure correct path

axios.defaults.withCredentials = true;

const Login = () => {
  const [mode, setMode] = useState("login");
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
          localStorage.setItem("user", JSON.stringify(landlord));
          window.location.href = "/verify";
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
          confirmPassword: formData.confirmPassword,
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

        const res = await axios.post(
          "https://breics-backend.onrender.com/api/landlords/register",
          payload
        );

        const { success, data } = res.data;

        if (success) {
          alert("Registration successful! Please log in.");
          setMode("login");
        } else {
          setError(
            res.data.message || res.data.error || "Registration failed."
          );
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between border-b pb-3 mb-5">
          <button
            className={`flex-1 py-2 text-lg ${
              isLogin ? "border-b-2 border-orange-500 font-semibold" : ""
            }`}
            onClick={() => handleToggle("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg ${
              !isLogin ? "border-b-2 border-orange-500 font-semibold" : ""
            }`}
            onClick={() => handleToggle("register")}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 mb-3 rounded text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />

              <select
                name="account_type"
                value={formData.account_type}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
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
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="companyDetails.registrationNumber"
                    placeholder="Registration Number"
                    value={formData.companyDetails.registrationNumber}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2"
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
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
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
                className="border border-gray-300 rounded px-3 py-2"
              />
               <p className="text-xs text-gray-500 mt-1">
                Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (!@#$%^&*).
              </p>
              <label className="text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  name="accept_terms"
                  checked={formData.accept_terms}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                I agree to the Terms and Conditions
              </label>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-orange-500 rounded-full animate-spin mx-auto" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>

          {isLogin && (
            <a
              href="/forgot-password"
              className="text-orange-500 text-sm mt-2 text-center hover:underline"
            >
              Forgot password?
            </a>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
