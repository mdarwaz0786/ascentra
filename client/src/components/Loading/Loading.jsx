const Loading = ({
  size = 40,
  fullScreen = false,
  text = "",
  className = "",
}) => {
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${fullScreen ? "vh-100" : ""} ${className}`}>
      <div
        style={{
          width: size,
          height: size,
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #000",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      {text && (
        <p className="mt-3 mb-0 text-muted">{text}</p>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;