import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import backgroundImg from "../image/heo.jpg";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Login = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLogin = mode === "login";

  const handleToggle = (tab) => {
    if (tab !== mode) {
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
      setSuccess("");
    }
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

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://breics-backend.onrender.com/api/landlords/request-verification-email",
        { email: formData.email }
      );
      if (res.data.success) {
        setSuccess("Verification email resent successfully!");
      } else {
        setError(res.data.message || "Failed to resend verification email.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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
          console.log(token)
          localStorage.setItem("user_id", landlord.id);
          localStorage.setItem("first_name", landlord.firstName);
          localStorage.setItem("user", JSON.stringify(landlord));
          if (landlord.occupation) {
            navigate("/dashboard")
          } else {

            navigate("/verify");
          }
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

        if (res.data.success) {
          navigate("/verify-mail", { state: { email: formData.email } });
        } else {
          setError(res.data.message || "Registration failed.");
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
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md relative transition-all duration-300 ease-in-out">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-center font-semibold text-gray-800 mb-4 text-lg">
          {isLogin
            ? "Login to Breics – List your properties"
            : "Register on Breics – You are a step away to list your home"}
        </h2>

        <div className="flex justify-between border-b pb-3 mb-5">
          <button
            className={`flex-1 py-2 text-center transition-all duration-200 ${
              isLogin
                ? "border-b-2 border-orange-500 text-orange-600 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => handleToggle("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center transition-all duration-200 ${
              !isLogin
                ? "border-b-2 border-orange-500 text-orange-600 font-bold"
                : "text-gray-500"
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
        {success && (
          <div className="bg-green-100 text-green-700 px-3 py-2 mb-3 rounded text-center text-sm">
            {success}
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
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />

              <select
                name="account_type"
                value={formData.account_type}
                onChange={handleChange}
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
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="companyDetails.registrationNumber"
                    placeholder="Registration Number"
                    value={formData.companyDetails.registrationNumber}
                    onChange={handleChange}
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {!isLogin && (
            <>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Password must contain at least 8 characters, including uppercase,
                lowercase, number, and special character (!@#$%^&*).
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
}
export default Login;
