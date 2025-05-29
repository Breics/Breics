import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(""); // Token sent via email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const result = await res.json();

      if (!res.ok || result.status !== "success") throw new Error(result.message);
      setStatus("success");
      setMessage(result.message);
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Reset failed.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>
      {status && <p className={status === "success" ? "success" : "error"}>{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          value={token}
          placeholder="Verification Token"
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
