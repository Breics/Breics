import React, { useState } from "react";
import heroImage from "../image/heo.jpg"; // adjust path as needed

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Reset Your Password</h2>

        {status && (
          <p
            className={`text-sm text-center mb-4 rounded-md px-4 py-2 ${
              status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleReset} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-gray-300 rounded-md p-3 mb-3 text-sm"
          />
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Verification Token"
            required
            className="border border-gray-300 rounded-md p-3 mb-3 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
            className="border border-gray-300 rounded-md p-3 mb-4 text-sm"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-md transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
