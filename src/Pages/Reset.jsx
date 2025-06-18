import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    <div className="w-screen h-screen bg-cover bg-center flex justify-center items-center px-4" style={{ backgroundImage: "url('/image/heo.jpg')" }}>
      <div className="bg-white px-6 py-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
        <h3 className="text-lg font-medium mt-4 mb-2">Reset your Password</h3>
        <p className="text-sm text-gray-500 mb-5">Set a new password for your Breic’s account</p>

        {error && <div className="text-red-600 text-sm font-medium mb-4">{error}</div>}

        {success ? (
          <div className="text-green-600 font-medium text-sm">
            ✅ Your password has been reset. You may now{" "}
            <a href="/login" className="underline text-orange-500 hover:text-orange-600">sign in</a>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-sm font-medium mb-1">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Re-enter new password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Confirm password reset"}
            </button>

            <button
              type="button"
              className="bg-gray-100 text-gray-800 py-2 rounded-md text-sm hover:bg-gray-200 transition"
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
