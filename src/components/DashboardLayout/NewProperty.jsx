import React, { useState } from "react";
import "../../styles/NewProperty.css";
import { useNavigate } from "react-router-dom";

const SubmitNewProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("location.")) {
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
    } else if (name === "agreement") {
      setFormData((prev) => ({
        ...prev,
        agreement: checked,
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
    ];
    for (const key of required) {
      if (!formData[key]) return `Please fill in the ${key} field.`;
    }
    if (!formData.agreement) return "You must agree to the condition.";
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
    // Added remove function
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
    // Added remove function
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
    // Added remove function
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
    // Added remove function
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async () => {
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }
  
    const transformedData = {
      ...formData,
      price: Number(formData.price),
      yearBuilt: Number(formData.yearBuilt),
      rooms: {
        ...formData.rooms,
        bedrooms: Number(formData.rooms.bedrooms),
        bathrooms: Number(formData.rooms.bathrooms),
        kitchens: Number(formData.rooms.kitchens),
        livingRooms: Number(formData.rooms.livingRooms),
        additionalRooms: formData.rooms.additionalRooms,
      },
    };
  
    try {
      console.log(transformedData);
      const token = localStorage.getItem("token");
      const res = await fetch("https://breics-backend.onrender.com/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedData),
      });
  
      const result = await res.json();
      if (res.ok) {
        setSuccessMsg("Property submitted successfully!");
        navigate("/dashboard/properties", { state: { newSubmitted: true } });
        setErrorMsg("");
        setValidationError("");
        setShowModal(false);

        // Reset form data
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
        });
      
        // Reset other form-related states
        setFeature({ name: "", description: "", isHighlighted: false });
        setRule({ title: "", description: "", isRequired: false });
        setAdditionalRoom({ name: "", description: "" });
        setNewAmenity("");
      } else {
        setErrorMsg(result.message || "An error occurred.");
      }
    } catch {
      setErrorMsg("Server error.");
    }
    setShowModal(false);
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="submit-container">
      <h2>Submit New Property</h2>
      {successMsg && <p className="success-msg">{successMsg}</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {validationError && <p className="validation-msg">{validationError}</p>}

      <form onSubmit={handleSubmit} className="form-section">
        <h3>General Info</h3>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        
        <input
          name="propertyType"
          type="text"
          placeholder="Property type"
          value={formData.propertyType}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="yearBuilt"
          type="number"
          placeholder="Year Built"
          value={formData.yearBuilt}
          onChange={handleChange}
        />
        <input
          name="availableFrom"
          type="date"
          value={formData.availableFrom}
          onChange={handleChange}
        />
        <input
          name="availableTo"
          type="date"
          value={formData.availableTo}
          onChange={handleChange}
        />

        <h3>Location</h3>
        {["address", "city", "state", "postalCode", "country"].map((field) => (
          <input
            key={field}
            name={`location.${field}`}
            placeholder={field}
            value={formData.location[field]}
            onChange={handleChange}
          />
        ))}

        <h3>Rooms</h3>
        {["bedrooms", "bathrooms", "kitchens", "livingRooms"].map((room) => (
          <input
            key={room}
            name={`rooms.${room}`}
            type="number"
            placeholder={room}
            value={formData.rooms[room]}
            onChange={handleChange}
          />
        ))}

        <h4>Add Additional Room</h4>
        <input
          placeholder="Room Name"
          value={additionalRoom.name}
          onChange={(e) =>
            setAdditionalRoom((r) => ({ ...r, name: e.target.value }))
          }
        />
        <input
          placeholder="Description"
          value={additionalRoom.description}
          onChange={(e) =>
            setAdditionalRoom((r) => ({ ...r, description: e.target.value }))
          }
        />
        <button type="button" onClick={addAdditionalRoom}>
          + Add Room
        </button>

        {formData.rooms.additionalRooms.map((room, i) => (
          <div key={i}>
            <span>
              {room.name}: {room.description}
            </span>
            <button type="button" onClick={() => removeAdditionalRoom(i)}>
              ❌
            </button>{" "}
            {/* Added remove button */}
          </div>
        ))}

        <h3>Features</h3>
        <input
          placeholder="Feature Name"
          value={feature.name}
          onChange={(e) => setFeature((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Description"
          value={feature.description}
          onChange={(e) =>
            setFeature((f) => ({ ...f, description: e.target.value }))
          }
        />
        <label>
          Highlighted
          <input
            type="checkbox"
            checked={feature.isHighlighted}
            onChange={(e) =>
              setFeature((f) => ({ ...f, isHighlighted: e.target.checked }))
            }
          />
        </label>
        <button type="button" onClick={addFeature}>
          + Add Feature
        </button>

        {formData.features.map((f, i) => (
          <div key={i}>
            <span>
              {f.name}: {f.description} {f.isHighlighted && "(Highlighted)"}
            </span>
            <button type="button" onClick={() => removeFeature(i)}>
              ❌
            </button>{" "}
            {/* Added remove button */}
          </div>
        ))}

        <h3>Amenities</h3>
        <input
          placeholder="Amenity (e.g., WiFi)"
          value={newAmenity}
          onChange={(e) => setNewAmenity(e.target.value)}
        />
        <button type="button" onClick={addAmenity}>
          + Add Amenity
        </button>

        {formData.amenities.map((a, i) => (
          <div key={i}>
            <span>{a}</span>
            <button type="button" onClick={() => removeAmenity(i)}>
              ❌
            </button>{" "}
            {/* Added remove button */}
          </div>
        ))}

        <h3>Rules</h3>
        <input
          placeholder="Rule Title"
          value={rule.title}
          onChange={(e) => setRule((r) => ({ ...r, title: e.target.value }))}
        />
        <input
          placeholder="Rule Description"
          value={rule.description}
          onChange={(e) =>
            setRule((r) => ({ ...r, description: e.target.value }))
          }
        />
        <label>
          Required
          <input
            type="checkbox"
            checked={rule.isRequired}
            onChange={(e) =>
              setRule((r) => ({ ...r, isRequired: e.target.checked }))
            }
          />
        </label>
        <button type="button" onClick={addRule}>
          + Add Rule
        </button>

        {formData.rules.map((r, i) => (
          <div key={i}>
            <span>
              {r.title}: {r.description} {r.isRequired && "(Required)"}
            </span>
            <button type="button" onClick={() => removeRule(i)}>
              ❌
            </button>{" "}
            {/* Added remove button */}
          </div>
        ))}

        <label>
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
          />{" "}
          I agree to the condition...
        </label>

        <button type="submit" className="submit-btn">
          Submit Property
        </button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Submission</h3>
            <p>Do you want to list this property?</p>
            <button onClick={handleFormSubmit}>Yes, Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitNewProperty;
