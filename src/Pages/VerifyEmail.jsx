import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import backgroundImg from "../image/heo.jpg";
import {  FaTimes } from "react-icons/fa";

const VerifyEmail = () => {
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email || "";

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://breics-backend.onrender.com/api/landlords/verify-email/${token}`
      );
      if (res.data.success) {
        setSuccess("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(res.data.message || "Email verification failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
      setStatus("verified");
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://breics-backend.onrender.com/api/landlords/request-verification-email",
        { email }
      );
      if (res.data.success) {
        setSuccess("Verification email resent successfully!");
      } else {
        setError(res.data.message || "Failed to resend verification email.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md relative transition-all duration-300 ease-in-out">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-center font-semibold text-gray-800 mb-4 text-lg">
          Verify Your Email
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 mb-3 rounded text-center text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-3 py-2 mb-3 rounded text-center text-sm">
            {success}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {status === "verifying" && (
            <div className="text-center">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === "verified" && !success && (
            <>
              <p className="text-gray-600 text-center">
                Please check your email ({email}) for a verification link. Didn't
                receive it?
              </p>
              <button
                onClick={handleResendEmail}
                disabled={loading}
                className="bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-orange-500 rounded-full animate-spin mx-auto" />
                ) : (
                  "Resend Verification Email"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;



const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">General Info</h3>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="propertyType"
              type="text"
              placeholder="Property type"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="yearBuilt"
              type="number"
              placeholder="Year Built"
              value={formData.yearBuilt}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="availableFrom"
              type="date"
              value={formData.availableFrom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="availableTo"
              type="date"
              value={formData.availableTo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            {["address", "city", "state", "postalCode", "country"].map((field) => (
              <input
                key={field}
                name={`location.${field}`}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.location[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Rooms</h3>
            {["bedrooms", "bathrooms", "kitchens", "livingRooms"].map((room) => (
              <input
                key={room}
                name={`rooms.${room}`}
                type="number"
                placeholder={room.charAt(0).toUpperCase() + room.slice(1)}
                value={formData.rooms[room]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ))}
            <h4 className="text-md font-medium text-gray-700">Add Additional Room</h4>
            <input
              placeholder="Room Name"
              value={additionalRoom.name}
              onChange={(e) =>
                setAdditionalRoom((r) => ({ ...r, name: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Description"
              value={additionalRoom.description}
              onChange={(e) =>
                setAdditionalRoom((r) => ({ ...r, description: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addAdditionalRoom}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              + Add Room
            </button>
            {formData.rooms.additionalRooms.map((room, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {room.name}: {room.description}
                </span>
                <button
                  type="button"
                  onClick={() => removeAdditionalRoom(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            <input
              placeholder="Feature Name"
              value={feature.name}
              onChange={(e) => setFeature((f) => ({ ...f, name: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Description"
              value={feature.description}
              onChange={(e) =>
                setFeature((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={feature.isHighlighted}
                onChange={(e) =>
                  setFeature((f) => ({ ...f, isHighlighted: e.target.checked }))
                }
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">Highlighted</span>
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              + Add Feature
            </button>
            {formData.features.map((f, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {f.name}: {f.description} {f.isHighlighted && "(Highlighted)"}
                </span>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
            <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
            <input
              placeholder="Amenity (e.g., WiFi)"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              + Add Amenity
            </button>
            {formData.amenities.map((a, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">{a}</span>
                <button
                  type="button"
                  onClick={() => removeAmenity(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Rules</h3>
            <input
              placeholder="Rule Title"
              value={rule.title}
              onChange={(e) => setRule((r) => ({ ...r, title: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Rule Description"
              value={rule.description}
              onChange={(e) =>
                setRule((r) => ({ ...r, description: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rule.isRequired}
                onChange={(e) =>
                  setRule((r) => ({ ...r, isRequired: e.target.checked }))
                }
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">Required</span>
            </label>
            <button
              type="button"
              onClick={addRule}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              + Add Rule
            </button>
            {formData.rules.map((r, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {r.title}: {r.description} {r.isRequired && "(Required)"}
                </span>
                <button
                  type="button"
                  onClick={() => removeRule(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">I agree to the condition...</span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };




























