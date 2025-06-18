import React, { useState, useEffect } from "react";
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
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success } = res.data;
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
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 font-sans">
        <h1 className="text-2xl font-bold mb-2">Verify Account</h1>
        <p className="text-gray-500 mb-6">
          Verification involves confirming your identity. Once verified, you have access to list properties and manage tenants on Breics.
        </p>
        <hr className="mb-6" />

        <section>
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <p className="text-gray-400 mb-4">Please review and update your personal information</p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-700 mb-1">Enter your first name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-700 mb-1">Enter your last name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-700 mb-1">Phone number</label>
                <div className="flex items-center">
                  <span className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-l-md text-sm">+234</span>
                  <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-r-md" />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-700 mb-1">Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-700 mb-1">Date of birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-700 mb-1">Occupation</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="E.g. lawyer" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              {loading ? "Saving..." : "Save and Continue"}
            </button>
          </form>
        </section>

        <div className="mt-8 flex items-center gap-2 text-lg text-gray-800">
          <h3 className="font-semibold">ID Verification</h3>
          <FaLock className="text-blue-500" />
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
