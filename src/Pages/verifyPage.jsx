import React, { useState } from "react";
import "../styles/VerifyPage.css";
import {FaLock } from "react-icons/fa";
import Navbar from "../components/Dashboard/DasNavbar";
import { useNavigate } from 'react-router-dom';


const VerifyAccount = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Akorede",
    lastName: "Adeleke",
    phone: "9017556160",
    email: "AAdeleke@gmail.com",
    dob: "",
    occupation: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);

    // 🔁 Backend-ready: Replace this with an API call
    // fetch('/api/verify-account', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  };

  return (
    <>
      <Navbar />
      <div className="verify-container">
        <h1>Verify Account</h1>
        <p className="verify-subtext">
          Verification involves confirming your identity. Once verified, you
          have access to list properties and manage tenants on Breics
        </p>
        <hr />

        <section className="personal-info">
          <h2>Personal Information</h2>
          <p className="info-subtext">
            Please update your personal information
          </p>

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

            <button type="submit" className="verify-submit-btn" onClick={() => navigate('/verify-id')}>
              Save and continue
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
