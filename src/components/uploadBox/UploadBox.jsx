import { useState, useRef } from "react";
import "./uploadBox.css";

function UploadBox({ maxSizeMB = 5, allowedTypes }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const MAX_SIZE_BYTES = maxSizeMB * 1024 * 1024;

  const defaultAllowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
  ];

  const finalAllowedTypes = allowedTypes || defaultAllowedTypes;

  const validateFile = (uploadedFile) => {
    setError("");
    if (!uploadedFile) return;

    if (!finalAllowedTypes.includes(uploadedFile.type)) {
      setError("Only PNG, JPG, or SVG files are allowed.");
      return;
    }

    if (uploadedFile.size > MAX_SIZE_BYTES) {
      setError(`Max file size is ${maxSizeMB}MB.`);
      return;
    }

    setFile(uploadedFile);
  };

  const handleFileSelect = (e) => {
    validateFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    validateFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="uploadBoxContainer">
      <div
        className="uploadBox"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileSelect}
        />

        {!file ? (
          <p className="uploadText">
            Drag & Drop here or{" "}
            <span className="browseText">click to browse</span>
          </p>
        ) : (
          <p className="fileName">Selected: {file.name}</p>
        )}
      </div>

      {error && <p className="uploadError">{error}</p>}
    </div>
  );
}

export default UploadBox;
