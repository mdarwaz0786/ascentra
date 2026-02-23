import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { formatDate } from "../../helpers/formatDate";
import apis from '../../apis/apis';
import { useAuth } from "../../context/auth.context";

const ContactDetailPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchData(
    `${apis.contact.getSingle}/${id}`, validToken,
  );

  const contact = data?.data;

  return (
    <>
      <div className="container">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : contact ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">Contact Details</h4>
                  <span
                    className={`badge ${contact?.status
                      ? "bg-success"
                      : "bg-danger"
                      }`}
                  >
                    {contact.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Name:</strong>
                    <p>{contact?.name || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong>
                    <p>{contact?.email || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Mobile:</strong>
                    <p>{contact?.mobile || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Subject:</strong>
                    <p>{contact?.subject || "-"}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Message:</strong>
                  <div className="border rounded p-3 bg-light">
                    {contact?.message || "-"}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <strong>Created At:</strong>
                    <p>
                      {formatDate(contact?.createdAt)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <strong>Updated At:</strong>
                    <p>
                      {formatDate(contact?.updatedAt)}
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

export default ContactDetailPage;