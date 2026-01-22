import { useEffect, useState, useRef } from "react";

const Image = ({ label, placeholder = "image", name, value, onChange, required = false, error, width }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    if (value && typeof value === "string") {
      setPreview(value);
    };
  }, [value]);

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className={`${width} mb-4`}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded p-3 text-center ${isDragging ? "bg-light border-primary" : ""}`}
        style={{
          cursor: "pointer",
          border: `1px solid ${isDragging ? "#0d6efd" : "#ced4da"}`,
          transition: "border-color 0.2s ease",
        }}
        onClick={() => dropRef.current.querySelector("input").click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="img-thumbnail mb-2"
            style={{ maxHeight: "150px" }}
          />
        ) : (
          <p className="text-muted mb-0">
            {isDragging ? `Drop the ${placeholder} here...` : `Drag & drop an ${placeholder} or click to browse`}
          </p>
        )}

        <input
          type="file"
          id={name}
          name={name}
          accept="image/*"
          className="d-none"
          onChange={handleFileInputChange}
        />
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}

      {preview && (
        <div className="mt-2 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={removeImage}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Image;
