import JobCard from "../../components/Job/JobCard";

const CurrentOpeningSection = () => {
  return (
    <div className="py-5">
      <div className="container">
        {/* ===== Header ===== */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-semibold mb-0">Current Openings</h2>
          <button className="btn px-4" style={{ background: "#333", color: "#fff" }}>
            View All
          </button>
        </div>

        {/* ===== Cards ===== */}
        <div className="row g-4">
          <JobCard
            title="Compliance & Admissions Associate - UK University"
            university="A UK University"
            location="Mumbai Based"
            type="On-Site"
            experience="2 years"
          />

          <JobCard
            title="Student Outreach Officer - UK University"
            university="A UK University"
            location="Mumbai Based"
            type="On-Site"
            experience="3 years"
          />

          <JobCard
            title="Associate Representative - Canadian University"
            university="A Canadian University"
            location="Mumbai Based"
            type="On-Site"
            experience="3 - 5 years"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentOpeningSection;
