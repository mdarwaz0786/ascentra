import { useState, useRef } from "react";

const Images = ({ onChange, placeholder = "image" }) => {
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);

  const handleFiles = (files) => {
    const validFiles = Array.from(files);
    const newPreviews = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    onChange(updatedPreviews.map((p) => p.file));
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onChange(updated.map((p) => p.file));
  };

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">Upload Images</label>

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
        <p className="text-muted mb-0">
          {isDragging ? `Drop the ${placeholder} here...` : `Drag & drop an ${placeholder} or click to browse`}
        </p>

        <input
          type="file"
          accept="image/*"
          multiple
          className="d-none"
          onChange={handleFileInputChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="preview-container d-flex flex-wrap gap-2 mt-3">
          {previews.map((p, index) => (
            <div
              key={index}
              className="position-relative border rounded p-1"
              style={{ width: "100px", height: "100px", overflow: "hidden" }}
            >
              <img
                src={p.url}
                alt="Preview"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-1"
                onClick={() => removeImage(index)}
                style={{ lineHeight: "1" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Images;
