import React, { useState } from "react";
import "../styles/Forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    try {
      // Simulate sending email — replace with actual backend call
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error sending reset email.");

      setStatus("success");
      setMessage("Reset link sent! Check your inbox.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Sign in to Breics</h2>
        <h3>Forgot Password</h3>
        <p>
          Don’t worry! Enter your email address. We will send you a link to
          create a new password.
        </p>

        {status && (
          <div className={status === "success" ? "success-box" : "error-box"}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Enter your email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="orange-btn">
            Send reset link
          </button>

          <button
            type="button"
            className="go-back"
            onClick={() => (window.location.href = "/login")}
          >
            ← Go back to sign in page
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
