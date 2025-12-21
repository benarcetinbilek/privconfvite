import { useState, useRef, useEffect } from "react";
import "./uploadBox.css";

function UploadBox({ maxSizeMB = 5, allowedTypes, onHandleAdd }) {
  //TODO -- check maybe you need to upload the file to server and work with the uri
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

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(url);
  }, [file]);

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
    console.log("handkefileselect");
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    // validate
    setError("");
    if (!finalAllowedTypes.includes(uploadedFile.type)) {
      setError("Only PNG, JPG, or SVG files are allowed.");
      return;
    }
    if (uploadedFile.size > MAX_SIZE_BYTES) {
      setError(`Max file size is ${maxSizeMB}MB.`);
      return;
    }

    setFile(uploadedFile);

    // ✅ textureUri üret
    const textureUri = URL.createObjectURL(uploadedFile);

    // ✅ logo yüklenince parent’a bildir
    onHandleAdd("add", textureUri);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files?.[0];
    if (!uploadedFile) return;

    setError("");
    if (!finalAllowedTypes.includes(uploadedFile.type)) {
      setError("Only PNG, JPG, or SVG files are allowed.");
      return;
    }
    if (uploadedFile.size > MAX_SIZE_BYTES) {
      setError(`Max file size is ${maxSizeMB}MB.`);
      return;
    }

    setFile(uploadedFile);

    const textureUri = URL.createObjectURL(uploadedFile);
    onHandleAdd("add", textureUri);
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
