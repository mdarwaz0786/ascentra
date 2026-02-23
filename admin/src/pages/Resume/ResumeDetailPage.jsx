import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";
import { formatDate } from "../../helpers/formatDate";
import { useAuth } from "../../context/auth.context";

const ResumeDetailPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchData(
    `${apis.resume.getSingle}/${id}`,
    validToken,
  );

  const resumeData = data?.data;

  return (
    <>
      <div className="container">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : resumeData ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">Resume Details</h4>
                  <span
                    className={`badge ${resumeData?.status
                      ? "bg-success"
                      : "bg-danger"
                      }`}
                  >
                    {resumeData.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Name:</strong>
                    <p>{resumeData?.name || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong>
                    <p>{resumeData?.email || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Mobile:</strong>
                    <p>{resumeData?.mobile || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Applied Position:</strong>
                    <p>{resumeData?.position || "-"}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Cover Letter:</strong>
                  <div className="border rounded p-3 bg-light">
                    {resumeData?.coverLetter || "-"}
                  </div>
                </div>
                <div className="mb-4">
                  <strong>Resume File:</strong>
                  <div className="mt-2">
                    {resumeData.resume ? (
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}/${resumeData?.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm"
                      >
                        View / Download Resume
                      </a>
                    ) : (
                      <p>-</p>
                    )}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <strong>Created At:</strong>
                    <p>
                      {formatDate(resumeData?.createdAt)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <strong>Updated At:</strong>
                    <p>
                      {formatDate(resumeData?.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeDetailPage;
