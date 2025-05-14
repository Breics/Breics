import React, { useState } from "react";
import "../styles/IDVerification.css";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Navbar from "../components/Dashboard/DasNavbar";
import IDUploadModal from "../components/Dashboard/IDModal";

const IDVerification = ({ user }) => {
  const navigate = useNavigate();

  const [selectedIDType, setSelectedIDType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idData, setIdData] = useState(null); // Store the returned modal data

  const handleIDTypeSelect = (type) => {
    setSelectedIDType(type);
    setShowModal(true);
  };

  const handleSaveAndFinish = () => {
    // Prepare full data for backend
    const verificationPayload = {
      personalInfo: user,
      idInfo: idData,
    };

    // Simulate backend submission
    console.log("Submitted:", verificationPayload);
    alert("Verification info submitted.");
  };

  return (
    <>
      <Navbar />
      <div className="id-verification-container">
        <h2>Verify Account</h2>
        <p className="subtitle">
          Verification involves confirming your identity and you will need a
          Government issued photo ID. Once verified, you will have access to
          list properties and manage tenants on Breics
        </p>

        <div className="info-box">
          <div className="info-header">
            <h3>Personal Information</h3>
            <button
              className="edit-button"
              onClick={() => navigate("/verify-account")}
            >
              <FiEdit2 /> Edit
            </button>
          </div>
          <div className="info-grid">
            <div>
              <strong>{user?.firstName || "First name"}</strong>
              <p>First name</p>
            </div>
            <div>
              <strong>{user?.lastName || "Last name"}</strong>
              <p>Last name</p>
            </div>
            <div>
              <strong>{user?.email || "Email"}</strong>
              <p>Email Address</p>
            </div>
            <div>
              <strong>{user?.phone || "Phone"}</strong>
              <p>Phone number</p>
            </div>
            <div>
              <strong>{user?.dob || "Date of birth"}</strong>
              <p>Date of birth</p>
            </div>
            <div>
              <strong>{user?.occupation || "Occupation"}</strong>
              <p>Occupation</p>
            </div>
          </div>
        </div>

        <div className="id-section">
          <h3>ID Verification</h3>
          <p className="subtitle">
            Verify your identity by providing the information requested below
          </p>

          <div className="id-options-box">
            <p>Select the document you wish to be identified with</p>
            <div className="id-options">
              <label>
                <input
                  type="radio"
                  name="idType"
                  onChange={() => handleIDTypeSelect("driver")}
                />
                Driver’s Licence
              </label>
              <label>
                <input
                  type="radio"
                  name="idType"
                  onChange={() => handleIDTypeSelect("nin")}
                />
                National Identity Number (NIN)
              </label>
              <label>
                <input
                  type="radio"
                  name="idType"
                  onChange={() => handleIDTypeSelect("voter")}
                />
                Voter’s card
              </label>
            </div>
          </div>

          <button className="save-finish-btn" onClick={handleSaveAndFinish}>
            Save and finish
          </button>
        </div>

        {showModal && (
          <IDUploadModal
            type={selectedIDType}
            onClose={() => setShowModal(false)}
            onSubmit={(data) => {
              setIdData(data);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default IDVerification;
