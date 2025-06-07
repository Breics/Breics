import React, { useState, useEffect } from "react";
import "../styles/IDVerification.css";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Navbar from "../components/Dashboard/DasNavbar";
import IDUploadModal from "../components/Dashboard/IDModal";
import axios from "axios";

const IDVerification = () => {
  const navigate = useNavigate();
  const [selectedIDType, setSelectedIDType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idData, setIdData] = useState(null); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch latest user info on mount
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("No user ID found");
      return;
    }

    axios
      .get(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.data.landlord;
        setUser({
          ...user,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleIDTypeSelect = (type) => {
    setSelectedIDType(type);
    setShowModal(true);
  };

  const handleSaveAndFinish = async () => {
    const token = localStorage.getItem("token");

    if (!idData || !user?._id) {
      alert("Missing required data.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user._id);
    formData.append("idType", selectedIDType); // backend expects 'idType'
    formData.append("documentNumber", idData.documentNumber); // backend expects 'documentNumber'
    formData.append("document", idData.document); // backend expects 'document'
    

    try {
      const response = await axios.post(
        "https://breics-backend.onrender.com/api/landlords/verification/document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      
      if (response.data.success) {
        alert("Verification info submitted successfully.");
        navigate("/dashboard")
      
      } else {
        alert("Submission failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred during submission.");
    }
  };

  if (loading) return <p>Loading...</p>;

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
            <div><strong>{user?.firstName}</strong><p>First name</p></div>
            <div><strong>{user?.lastName}</strong><p>Last name</p></div>
            <div><strong>{user?.email}</strong><p>Email Address</p></div>
            <div><strong>{user?.phoneNumber}</strong><p>Phone number</p></div>
            <div><strong>{user?.dateOfBirth}</strong><p>Date of birth</p></div>
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
              <input type="radio" name="idType" onChange={() => handleIDTypeSelect("driver_license")} />
                Driver’s Licence
              </label>
              <label>
              <input type="radio" name="idType" onChange={() => handleIDTypeSelect("national_id")} />

                National Identity Number (NIN)
              </label>
              <label>
              <input type="radio" name="idType" onChange={() => handleIDTypeSelect("voter_card")} />

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
