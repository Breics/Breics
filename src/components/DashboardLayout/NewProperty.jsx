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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="submit-container">
      <h2>Submit New Property</h2>
      <div className="submit-wrapper">
        <div className="upload-section">
          <div className="upload-box">Upload an image</div>
          <ul className="image-list">
            <li>
              Image-001.jpg <span>125kb</span>
            </li>
            <li>
              Image-001.jpg <span>125kb</span>
            </li>
          </ul>
        </div>

        <form className="form-section" onSubmit={handleSubmit}>
          <h3>General information</h3>

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
          >
            <option>Select property type</option>
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

          {/* Repeat for other inputs */}
          <h3> Property Information</h3>
          <div className="property-info">
            <div className="property-group">
              <label>Property title*</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Year Built*</label>
              <input
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>LGA*</label>
              <input
                name="lga"
        
                value={formData.lga}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="property-info">
            <div className="property-group">
              <label>Country*</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>State*</label>
              <input
                name="state"
        
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>City*</label>
              <input
                name="city"
        
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="property-info">
            <div className="property-group">
              <label>Street Address*</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Landmark*</label>
              <input
                name="landmark"
                
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Zip Code*</label>
              <input
                name="zip"
        
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="property-info">
            <div className="property-group">
              <label>No of Bedrooms*</label>
              <input
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>No of Bathrooms*</label>
              <input
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Parking Space*</label>
              <input
                name="parking"
        
                value={formData.parking}
                onChange={handleChange}
              />
            </div>
          </div>
          <h3>Special Prefrences</h3>
          <div className="property-info">
            <div className="property-group">
              <label>Preferred Religion</label>
              <input
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Preferred Tribe</label>
              <input
                name="tribe"
                
                value={formData.tribe}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Preferred Martial Status</label>
              <input
                name="martial"
        
                value={formData.marital}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="property-info">
            <div className="property-group">
              <label>Preferred Employment </label>
              <input
                name="employment"
                value={formData.employment}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Maximum Co-residents</label>
              <input
                name="coResidents"
                
                value={formData.coResidents}
                onChange={handleChange}
              />
            </div>
            <div className="property-group">
              <label>Preferred Gender</label>
              <input
                name="gender"
        
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Continue building out all the rest of the form fields in same pattern */}
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
    </div>
  );
};

export default SubmitNewProperty;
