import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Reset.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirm) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        <h3>Reset your Password</h3>
        <p>Set a new password for your Breic’s account</p>

        {error && <div className="error-box">{error}</div>}

        {success ? (
          <div className="success-msg">
            ✅ Your password has been reset. You may now <a href="/login">sign in</a>.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Re-enter new password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button type="submit" className="orange-btn" disabled={loading}>
              {loading ? "Resetting..." : "Confirm password reset"}
            </button>

            <button
              type="button"
              className="go-back"
              onClick={() => (window.location.href = "/login")}
            >
              ← Go to sign in page
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
