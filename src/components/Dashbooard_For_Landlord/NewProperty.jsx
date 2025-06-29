import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubmitNewProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    images: [],
    title: "",
    description: "",
    propertyType: "",
    status: "available",
    price: "",
    location: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Nigeria",
      coordinates: {
        lat: "",
        lng: "",
      },
    },
    rooms: {
      bedrooms: "",
      bathrooms: "",
      kitchens: "",
      livingRooms: "",
      additionalRooms: [],
    },
    features: [],
    amenities: [],
    yearBuilt: "",
    availableFrom: "",
    availableTo: "",
    rules: [],
    agreement: false,
    mainImageIndex: null,
    isActive: true,
  });

  const [feature, setFeature] = useState({
    name: "",
    description: "",
    isHighlighted: false,
  });
  const [rule, setRule] = useState({
    title: "",
    description: "",
    isRequired: false,
  });
  const [additionalRoom, setAdditionalRoom] = useState({
    name: "",
    description: "",
  });
  const [newAmenity, setNewAmenity] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const newFiles = Array.from(files).filter(file => file.size <= maxSize);
      if (newFiles.length !== files.length) {
        setErrorMsg("Some images exceed the 5MB limit.");
        return;
      }
      if (formData.images.length + newFiles.length > 5) {
        setErrorMsg("You can upload a maximum of 5 images.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
        mainImageIndex: prev.mainImageIndex === null && newFiles.length > 0 ? prev.images.length : prev.mainImageIndex,
      }));
    } else if (name.includes("location.coordinates.")) {
      const key = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: {
            ...prev.location.coordinates,
            [key]: value,
          },
        },
      }));
    } else if (name.includes("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else if (name.includes("rooms.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [key]: value,
        },
      }));
    } else if (name === "agreement" || name === "isActive") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "mainImageIndex") {
      setFormData((prev) => ({
        ...prev,
        mainImageIndex: parseInt(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const required = [
      "title",
      "description",
      "propertyType",
      "price",
      "yearBuilt",
      "location.address",
      "location.city",
      "location.state",
      "location.postalCode",
      "location.coordinates.lat",
      "location.coordinates.lng",
    ];
    for (const key of required) {
      const keys = key.split(".");
      let value = formData;
      for (const k of keys) {
        value = value[k];
        if (value === undefined || value === "") {
          return `Please fill in the ${keys.join(" ")} field.`;
        }
      }
    }
    if (!formData.agreement) return "You must agree to the condition.";
    if (formData.images.length === 0) return "Please upload at least one image.";
    if (formData.mainImageIndex === null || formData.mainImageIndex >= formData.images.length) {
      return "Please select a main image.";
    }
    return "";
  };

  const addFeature = () => {
    if (feature.name && feature.description) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }));
      setFeature({ name: "", description: "", isHighlighted: false });
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addRule = () => {
    if (rule.title && rule.description) {
      setFormData((prev) => ({
        ...prev,
        rules: [...prev.rules, rule],
      }));
      setRule({ title: "", description: "", isRequired: false });
    }
  };

  const removeRule = (index) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  const addAdditionalRoom = () => {
    if (additionalRoom.name && additionalRoom.description) {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          additionalRooms: [...prev.rooms.additionalRooms, additionalRoom],
        },
      }));
      setAdditionalRoom({ name: "", description: "" });
    }
  };

  const removeAdditionalRoom = (index) => {
    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        additionalRooms: prev.rooms.additionalRooms.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const addAmenity = () => {
    if (newAmenity) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity],
      }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      mainImageIndex:
        prev.mainImageIndex === index
          ? null
          : prev.mainImageIndex > index && prev.mainImageIndex !== null
          ? prev.mainImageIndex - 1
          : prev.mainImageIndex,
    }));
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setValidationError("");
    const error = validateForm();
    if (error) {
      setValidationError(error);
      setShowModal(false);
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("propertyType", formData.propertyType);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("yearBuilt", Number(formData.yearBuilt));
    formDataToSend.append("availableFrom", formData.availableFrom);
    formDataToSend.append("availableTo", formData.availableTo);
    formDataToSend.append("agreement", formData.agreement);
    formDataToSend.append("isActive", formData.isActive);
    formDataToSend.append("mainImageIndex", formData.mainImageIndex);

    // Append location fields
    Object.entries(formData.location).forEach(([key, value]) => {
      if (key === "coordinates") {
        formDataToSend.append("location[coordinates][lat]", Number(value.lat));
        formDataToSend.append("location[coordinates][lng]", Number(value.lng));
      } else {
        formDataToSend.append(`location[${key}]`, value);
      }
    });

    // Append rooms fields
    Object.entries(formData.rooms).forEach(([key, value]) => {
      if (key === "additionalRooms") {
        value.forEach((room, index) => {
          formDataToSend.append(
            `rooms[additionalRooms][${index}][name]`,
            room.name
          );
          formDataToSend.append(
            `rooms[additionalRooms][${index}][description]`,
            room.description
          );
        });
      } else {
        formDataToSend.append(`rooms[${key}]`, Number(value) || 0);
      }
    });

    // Append features
    formData.features.forEach((f, index) => {
      formDataToSend.append(`features[${index}][name]`, f.name);
      formDataToSend.append(`features[${index}][description]`, f.description);
      formDataToSend.append(
        `features[${index}][isHighlighted]`,
        f.isHighlighted
      );
    });

    // Append amenities
    formData.amenities.forEach((a, index) => {
      formDataToSend.append(`amenities[${index}]`, a);
    });

    // Append rules
    formData.rules.forEach((r, index) => {
      formDataToSend.append(`rules[${index}][title]`, r.title);
      formDataToSend.append(`rules[${index}][description]`, r.description);
      formDataToSend.append(`rules[${index}][isRequired]`, r.isRequired);
    });

    // Append images
    formData.images.forEach((img) => {
      formDataToSend.append("images", img);
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("Authentication token not found. Please log in again.");
        setShowModal(false);
        setIsLoading(false);
        return;
      }

      console.log("Submitting form data:", Object.fromEntries(formDataToSend));
      console.log("Images to upload:", formData.images);

      const res = await fetch("https://breics-backend.onrender.com/api/properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await res.json();
      console.log("Server response:", result);

      if (res.ok) {
        setSuccessMsg("Property submitted successfully!");
        navigate("/dashboard/properties", { state: { newSubmitted: true } });
        setErrorMsg("");
        setValidationError("");
        setShowModal(false);

        setFormData({
          title: "",
          description: "",
          propertyType: "",
          status: "available",
          price: "",
          location: {
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "Nigeria",
            coordinates: {
              lat: "",
              lng: "",
            },
          },
          rooms: {
            bedrooms: "",
            bathrooms: "",
            kitchens: "",
            livingRooms: "",
            additionalRooms: [],
          },
          features: [],
          amenities: [],
          yearBuilt: "",
          availableFrom: "",
          availableTo: "",
          rules: [],
          agreement: false,
          images: [],
          mainImageIndex: null,
          isActive: true,
        });

        setFeature({ name: "", description: "", isHighlighted: false });
        setRule({ title: "", description: "", isRequired: false });
        setAdditionalRoom({ name: "", description: "" });
        setNewAmenity("");
      } else {
        setErrorMsg(result.message || `Submission failed with status ${res.status}. Please try again.`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (err.message.includes("Failed to fetch")) {
        setErrorMsg("Unable to connect to the server. The server may be down or experiencing issues. Please try again later.");
      } else {
        setErrorMsg("An unexpected error occurred: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const totalPages = 6;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
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
            <input
              name="location.coordinates.lat"
              type="number"
              step="any"
              placeholder="Latitude"
              value={formData.location.coordinates.lat}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="location.coordinates.lng"
              type="number"
              step="any"
              placeholder="Longitude"
              value={formData.location.coordinates.lng}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
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
            <h3 className="text-lg font-semibold text-gray-900">Upload Images</h3>
            <input
              key={formData.images.length}
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-sm text-gray-500">
              Upload up to 5 images (JPG, PNG, max 5MB each)
            </p>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {formData.images.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute top-1 left-1 flex items-center space-x-2">
                      <input
                        type="radio"
                        name="mainImageIndex"
                        value={idx}
                        checked={formData.mainImageIndex === idx}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Main Image</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-80 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 5:
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
      case 6:
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
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">List property as active</span>
            </label>
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit New Property</h2>
        {successMsg && (
          <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{successMsg}</p>
        )}
        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{errorMsg}</p>
        )}
        {validationError && (
          <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{validationError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderPage()}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400"
            >
              Previous
            </button>
            {currentPage === totalPages ? (
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Submitting..." : "Submit Property"}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextPage}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Next
              </button>
            )}
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Submission</h3>
              <p className="text-gray-600 mb-6">Do you want to list this property?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleFormSubmit}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Submitting..." : "Yes, Submit"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitNewProperty;