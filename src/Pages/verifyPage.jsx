import React, { useState, useEffect } from "react";
import "../styles/VerifyPage.css";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Dashboard/DasNavbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const VerifyAccount = () => {
  const navigate = useNavigate();
  
  // Initialize state. Defaults will be replaced by fetched user details.
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

  // When component mounts, fetch existing user details via backend API.
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .post("http://localhost/breicsk/backk/get_user_info.php", { user_id: userId })
        .then((res) => {
          if (res.data.success && res.data.data) {
            const { full_name, email, phone_number } = res.data.data;
            // Split full name into first and last name (if possible)
            const names = full_name.trim().split(" ");
            setFormData((prev) => ({
              ...prev,
              firstName: names[0] || "",
              lastName: names.slice(1).join(" ") || "",
              phone: phone_number || "",
              email: email || "",
            }));
          } else {
            console.error("Fetch user error:", res.data.message);
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update the backend with edited details.
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Update user details API endpoint (make sure your backend has this implemented)
    axios
      .post("http://localhost/breicsk/backk/update_user.php", {
        user_id: localStorage.getItem("user_id"),
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone, // Assume backend expects phone_number
        email: formData.email,
        dob: formData.dob,
        occupation: formData.occupation,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Updated successfully")
          // On successful update, navigate to the next step (e.g. ID verification)
          navigate("/verify-id");
        } else {
          console.log(res.data.message)
          setError(res.data.message || "Update failed.");
        }
      })
      .catch((error) => {
        console.error("Update error:", error);
        if (error.response) {
          console.error("Backend response error:", error.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
          <p className="info-subtext">
            Please review and update your personal information
          </p>

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
              {loading ? "Saving..." : "Save and continue"}
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
