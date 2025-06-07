import React, { useState } from "react";
import "../../styles/NewProperty.css";

const SubmitNewProperty = () => {
  const [formData, setFormData] = useState({
    amount: "",
    propertyType: "",
    serviced: "Serviced",
    title: "",
    year: "",
    lga: "",
    country: "",
    state: "",
    city: "",
    address: "",
    landmark: "",
    zip: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    religion: "",
    tribe: "",
    marital: "",
    employment: "",
    coResidents: "",
    gender: "",
    sideCategory: "",
    sideName: "",
    consent: false,
    agreement: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "amount", "propertyType", "title", "year", "lga", "country", "state",
      "city", "address", "landmark", "zip", "bedrooms", "bathrooms", "parking"
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Please fill in the ${field} field.`;
      }
    }
    if (!formData.agreement) {
      return "You must agree to the condition.";
    }
    return "";
  };

  const handleFormSubmit = async () => {
    console.log("Submitting form...");
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    try {
        const token = localStorage.getItem("token");
      const res = await fetch("https://breics-backend.onrender.com/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMsg("Property submitted successfully!");
        setErrorMsg("");
        setValidationError("");
        setFormData({
          amount: "",
          propertyType: "",
          serviced: "Serviced",
          title: "",
          year: "",
          lga: "",
          country: "",
          state: "",
          city: "",
          address: "",
          landmark: "",
          zip: "",
          bedrooms: "",
          bathrooms: "",
          parking: "",
          religion: "",
          tribe: "",
          marital: "",
          employment: "",
          coResidents: "",
          gender: "",
          sideCategory: "",
          sideName: "",
          consent: false,
          agreement: false,
        });
      } else {
        setErrorMsg(result.message || "An error occurred while submitting.");
        setSuccessMsg("");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to the server.");
      setSuccessMsg("");
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

      <div className="submit-wrapper">
        <form className="form-section" onSubmit={handleSubmit}>
          <h3>General Information</h3>

          <label>Amount*</label>
          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />

          <label>Property type*</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="sel"
          >
            <option value="">Select property type</option>
            <option>2 Bedroom</option>
            <option>3 Bedroom</option>
          </select>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="serviced"
                value="Serviced"
                checked={formData.serviced === "Serviced"}
                onChange={handleChange}
              />{" "}
              Serviced
            </label>
            <label>
              <input
                type="radio"
                name="serviced"
                value="Unserviced"
                checked={formData.serviced === "Unserviced"}
                onChange={handleChange}
              />{" "}
              Unserviced
            </label>
          </div>

          {/* --- Property Info --- */}
          <h3>Property Information</h3>
          <div className="property-info">
            {[
              ["title", "Property title"],
              ["year", "Year Built", "number"],
              ["lga", "LGA"],
              ["country", "Country"],
              ["state", "State"],
              ["city", "City"],
              ["address", "Street Address"],
              ["landmark", "Landmark"],
              ["zip", "Zip Code"],
              ["bedrooms", "No of Bedrooms"],
              ["bathrooms", "No of Bathrooms", "number"],
              ["parking", "Parking Space"]
            ].map(([name, label, type = "text"]) => (
              <div className="property-group" key={name}>
                <label>{label}*</label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* --- Special Preferences --- */}
          <h3>Special Preferences</h3>
          <div className="property-info">
            {[
              ["religion", "Preferred Religion"],
              ["tribe", "Preferred Tribe"],
              ["marital", "Preferred Marital Status"],
              ["employment", "Preferred Employment"],
              ["coResidents", "Maximum Co-residents"],
              ["gender", "Preferred Gender"],
              ["sideCategory", "Select Category"],
              ["sideName", "Type Name Details"]
            ].map(([name, label]) => (
              <div className="property-group" key={name}>
                <label>{label}</label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* --- Agreement Checkboxes --- */}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />{" "}
              I have the consent...
            </label>
            <label>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
              />{" "}
              I agree to the condition...
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Save and complete
          </button>
        </form>
      </div>

      {/* --- Confirmation Modal --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">
              <img src="/icons/house-user.svg" alt="confirm" />
            </div>
            <h3>Confirm Property Submission</h3>
            <p>Do you want to list this property on Breics?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleFormSubmit}>
                Yes! List my property
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitNewProperty;
