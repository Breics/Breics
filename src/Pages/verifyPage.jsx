import React, { useState, useEffect } from "react";
import "../styles/VerifyPage.css";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Dashboard/DasNavbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      axios
        .get(`http://localhost:5000/api/user/${userId}`, { withCredentials: true })
        .then((res) => {
          const { firstName, lastName, email, phone, dob, occupation } = res.data.user;
          setFormData({
            firstName: firstName || "",
            lastName: lastName || "",
            phone: phone || "",
            email: email || "",
            dob: dob || "",
            occupation: occupation || "",
          });
        })
        .catch((err) => {
          setError("Failed to fetch user data.");
          console.error(err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userId = localStorage.getItem("user_id");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          dob: formData.dob,
          occupation: formData.occupation,
        },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        alert("Updated successfully");
        navigate("/verify-id");
      } else {
        setError(res.data.message || "Update failed.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred while updating your info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="verify-container">
        <h1>Verify Account</h1>
        <p className="verify-subtext">
          Verification involves confirming your identity. Once verified, you have access to list properties and manage tenants on Breics.
        </p>
        <hr />

        <section className="personal-info">
          <h2>Personal Information</h2>
          <p className="info-subtext">Please review and update your personal information</p>

          {error && <p className="error-message">{error}</p>}

          <form className="verify-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Enter your first name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Enter your last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone number</label>
                <div className="phone-group">
                  <span className="country-code">+234</span>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of birth</label>
                <div className="dob-group">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  placeholder="E.g. lawyer"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="verify-submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save and Continue"}
            </button>
          </form>
        </section>

        <div className="id-verification">
          <h3>ID Verification</h3>
          <FaLock className="lock-icon" />
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
