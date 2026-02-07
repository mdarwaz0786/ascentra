const WorkCard = ({ icon, title, description }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 border shadow-sm rounded-4">
        <div className="card-body p-4">

          <div
            className="d-flex align-items-center justify-content-center rounded-4 mb-3"
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "#fff5f5",
            }}
          >
            <span className="text-danger fs-4">{icon}</span>
          </div>

          <h5 className="fw-bold mb-2">{title}</h5>

          <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
            {description}
          </p>

        </div>
      </div>
    </div>
  );
};

export default WorkCard;
