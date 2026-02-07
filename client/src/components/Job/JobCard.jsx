const JobCard = ({ title, university, location, type, experience }) => {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm border rounded-3">
        <div className="card-body d-flex flex-column p-4">

          <h5 className="fw-bolder mb-3">
            {title}
          </h5>

          <p className="fw-bolder mb-2">Job Description:</p>

          <ul className="ps-3 mb-4">
            <li><strong>University:</strong> {university}</li>
            <li><strong>Location:</strong> {location}</li>
            <li><strong>Full time</strong> | {type}</li>
            <li><strong>Work Ex:</strong> {experience}</li>
          </ul>

          <div className="mt-auto">
            <button className="btn px-4" style={{ background: "#333", color: "#fff" }}>
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
