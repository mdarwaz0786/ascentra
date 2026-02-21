import { BsCalendar3 } from "react-icons/bs";
import { formatDate } from "../../helpers/formatDate";

const ContentDetail = ({
  title,
  date,
  time,
  fullDescription,
}) => {
  return (
    <div className="container my-4">
      {/* Title */}
      <h2 className="fw-semibold mb-3">{title}</h2>
      {/* Date */}
      <div className="d-flex align-items-center text-muted mb-2">
        <BsCalendar3 className="me-2" />
        {formatDate(date)} | {time}
      </div>
      <hr />
      {/* Full Description */}
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: fullDescription }}
      />
    </div>
  );
};

export default ContentDetail;
