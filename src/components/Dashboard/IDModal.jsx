import React, { useState } from "react";

const IDUploadModal = ({ idType, onClose, onSubmit }) => {
  const [documentNumber, setdocumentNumber] = useState("");
  const [idFile, setIdFile] = useState(null);

  const getTitle = () => {
    switch (idType) {
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
    switch (idType) {
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
    switch (idType) {
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
    const file = e.target.files[0];
    if (file && !["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
      alert("Unsupported file type. Please upload PNG, JPG, or PDF.");
      return;
    }
    setIdFile(file);
  };

  const handleSubmit = () => {
    if (!documentNumber || !idFile) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit({
      documentNumber,
      document: idFile,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h4 className="text-lg font-semibold mb-3">{getTitle()}</h4>
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={documentNumber}
          onChange={(e) => setdocumentNumber(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="mb-5">
          <label className="block font-medium mb-1">{getFileLabel()}</label>
          <small className="block text-gray-500 mb-2">Supported file types: .pdf, .jpg, or .png</small>

          <div className="flex gap-3">
            <input
              type="text"
              value={idFile?.name || ""}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <label className="bg-gray-100 px-4 py-2 rounded-md border border-gray-300 cursor-pointer text-sm font-medium">
              Choose file
              <input
                type="file"
                onChange={handleFileChange}
                hidden
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDUploadModal;
