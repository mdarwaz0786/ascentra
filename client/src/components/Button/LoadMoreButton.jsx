const LoadMoreButton = ({
  onClick,
  text = "Load More",
  loading = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-5">
      <button
        className={`btn ${className}`}
        style={{ background: "#333", color: "#fff" }}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? "Loading..." : text}
      </button>
    </div>
  );
};

export default LoadMoreButton;
