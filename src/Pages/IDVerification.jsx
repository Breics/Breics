import React, { useState, useEffect } from "react";
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
          dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split("T")[0]
            : "",
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
    formData.append("idType", selectedIDType);
    formData.append("documentNumber", idData.documentNumber);
    formData.append("document", idData.document);

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
        navigate("/dashboard");
      } else {
        alert("Submission failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred during submission.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-100 font-sans text-gray-800">
        <h2 className="text-2xl font-semibold mb-2">Verify Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Verification involves confirming your identity and you will need a Government issued photo ID.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <button
              onClick={() => navigate("/verify-account")}
              className="text-amber-500 flex items-center gap-1 text-sm font-medium"
            >
              <FiEdit2 /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div><strong className="block text-sm font-semibold">{user?.firstName}</strong><p className="text-xs text-gray-500">First name</p></div>
            <div><strong className="block text-sm font-semibold">{user?.lastName}</strong><p className="text-xs text-gray-500">Last name</p></div>
            <div><strong className="block text-sm font-semibold">{user?.email}</strong><p className="text-xs text-gray-500">Email Address</p></div>
            <div><strong className="block text-sm font-semibold">{user?.phoneNumber}</strong><p className="text-xs text-gray-500">Phone number</p></div>
            <div><strong className="block text-sm font-semibold">{user?.dateOfBirth}</strong><p className="text-xs text-gray-500">Date of birth</p></div>
            <div><strong className="block text-sm font-semibold">{user?.occupation}</strong><p className="text-xs text-gray-500">Occupation</p></div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-medium mb-2">ID Verification</h3>
          <p className="text-sm text-gray-500 mb-4">Select the document type to upload</p>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-sm mb-4">Select the document you wish to be identified with</p>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="idType" onChange={() => handleIDTypeSelect("driver_license")} />
                Driver’s Licence
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="idType" onChange={() => handleIDTypeSelect("national_id")} />
                National Identity Number (NIN)
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="idType" onChange={() => handleIDTypeSelect("voter_card")} />
                Voter’s card
              </label>
            </div>
          </div>

          <button
            onClick={handleSaveAndFinish}
            className="bg-amber-500 text-white mt-6 py-3 px-6 rounded-md w-full max-w-xs font-medium hover:bg-amber-600"
          >
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
