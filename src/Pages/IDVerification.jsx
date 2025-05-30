import React, { useState } from "react";
import "../styles/IDVerification.css";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Navbar from "../components/Dashboard/DasNavbar";
import IDUploadModal from "../components/Dashboard/IDModal";
import axios from "axios";

const IDVerification = ({ user }) => {
  const navigate = useNavigate();
  const [selectedIDType, setSelectedIDType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idData, setIdData] = useState(null); // { id_number, id_image (File) }

  const handleIDTypeSelect = (type) => {
    setSelectedIDType(type);
    setShowModal(true);
  };

  const handleSaveAndFinish = async () => {
    if (!idData || !user?._id) {
      alert("Missing required data.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user._id);
    formData.append("id_type", selectedIDType);
    formData.append("id_number", idData.id_number);
    formData.append("id_image", idData.id_image); // File object

    try {
      const response = await axios.post(
        "https://breics.onrender.com/api/verify-id",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Verification info submitted successfully.");
      } else {
        alert("Submission failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred during submission.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="id-verification-container">
        <h2>Verify Account</h2>
        <p className="subtitle">
          Verification involves confirming your identity and you will need a Government issued photo ID.
        </p>

        <div className="info-box">
          <div className="info-header">
            <h3>Personal Information</h3>
            <button className="edit-button" onClick={() => navigate("/verify-account")}>
              <FiEdit2 /> Edit
            </button>
          </div>
          <div className="info-grid">
            <div><strong>{user?.first_name}</strong><p>First name</p></div>
            <div><strong>{user?.last_name}</strong><p>Last name</p></div>
            <div><strong>{user?.email}</strong><p>Email Address</p></div>
            <div><strong>{user?.phone_number}</strong><p>Phone number</p></div>
            <div><strong>{user?.dob}</strong><p>Date of birth</p></div>
            <div><strong>{user?.occupation}</strong><p>Occupation</p></div>
          </div>
        </div>

        <div className="id-section">
          <h3>ID Verification</h3>
          <p className="subtitle">Select the document type to upload</p>

          <div className="id-options-box">
            <p>Select the document you wish to be identified with</p>
            <div className="id-options">
              <label>
                <input type="radio" name="idType" onChange={() => handleIDTypeSelect("driver")} />
                Driver’s Licence
              </label>
              <label>
                <input type="radio" name="idType" onChange={() => handleIDTypeSelect("nin")} />
                National Identity Number (NIN)
              </label>
              <label>
                <input type="radio" name="idType" onChange={() => handleIDTypeSelect("voter")} />
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
              setIdData(data); // { id_number, id_image }
              setShowModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default IDVerification;
