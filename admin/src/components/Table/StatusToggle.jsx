const StatusToggle = ({
  id,
  status,
  toggling,
  onToggle,
  activeLabel = "Show",
  inactiveLabel = "Hide",
}) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={status}
        disabled={toggling[id]}
        onChange={onToggle}
        style={{ cursor: toggling[id] ? "not-allowed" : "pointer", transform: "scale(1.3)" }}
      />
      <label className="form-check-label ms-1">
        {status ? activeLabel : inactiveLabel}
      </label>
    </div>
  );
};

export default StatusToggle;
