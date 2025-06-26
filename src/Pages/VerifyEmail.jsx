import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import backgroundImg from "../image/heo.jpg";
import {  FaTimes } from "react-icons/fa";

const VerifyEmail = () => {
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email || "";

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://breics-backend.onrender.com/api/landlords/verify-email/${token}`
      );
      if (res.data.success) {
        setSuccess("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(res.data.message || "Email verification failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
      setStatus("verified");
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://breics-backend.onrender.com/api/landlords/request-verification-email",
        { email }
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
          Verify Your Email
        </h2>

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

        <div className="flex flex-col gap-3">
          {status === "verifying" && (
            <div className="text-center">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === "verified" && !success && (
            <>
              <p className="text-gray-600 text-center">
                Please check your email ({email}) for a verification link. Didn't
                receive it?
              </p>
              <button
                onClick={handleResendEmail}
                disabled={loading}
                className="bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-orange-500 rounded-full animate-spin mx-auto" />
                ) : (
                  "Resend Verification Email"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
