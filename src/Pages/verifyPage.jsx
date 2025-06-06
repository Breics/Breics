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
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      axios
        .get(`https://breics-backend.onrender.com/api/landlords/${userId}`)
        .then((res) => {
          const { firstName, lastName, email, phoneNumber, dateOfBirth, occupation } = res.data.data.landlord;
          const formattedDob = dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : "";
          setFormData({
            firstName: firstName || "",
            lastName: lastName || "",
            phoneNumber: phoneNumber || "",
            email: email || "",
            dateOfBirth: formattedDob || "",
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

    const token = localStorage.getItem("token");


    try {
      const res = await axios.put(
        `https://breics-backend.onrender.com/api/landlords/profile`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phone,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          occupation: formData.occupation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success, data } = res.data;
      if (success) {
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
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
