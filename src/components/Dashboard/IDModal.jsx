import React, { useState } from "react";
import "../../styles/IDModal.css";

const IDUploadModal = ({ type, onClose, onSubmit }) => {
  const [idNumber, setIdNumber] = useState("");
  const [idFile, setIdFile] = useState(null);

  const getTitle = () => {
    switch (type) {
      case "driver":
        return "Driver’s Licence Number";
      case "nin":
        return "Enter your NIN";
      case "voter":
        return "Enter your Voter’s Number";
      default:
        return "";
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "driver":
        return "Enter your Driver’s Licence Number";
      case "nin":
        return "Enter your NIN";
      case "voter":
        return "Enter your Voter’s Number";
      default:
        return "";
    }
  };

  const getFileLabel = () => {
    switch (type) {
      case "driver":
        return "Upload Image of Driver’s Licence";
      case "nin":
        return "Upload NIN slip";
      case "voter":
        return "Upload Image of Voter’s Card";
      default:
        return "";
    }
  };

  const handleFileChange = (e) => {
    setIdFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!idNumber || !idFile) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit({ type, idNumber, idFile });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h4>{getTitle()}</h4>
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />

        <div className="file-upload">
          <label>{getFileLabel()}</label>
          <small>Supported file types: .pdf, .jpg, or .png</small>
          <div className="file-row">
            <input type="text" value={idFile?.name || ""} readOnly />
            <label className="choose-file-btn">
              Choose file
              <input type="file" onChange={handleFileChange} hidden />
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDUploadModal;
