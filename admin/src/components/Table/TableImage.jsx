import { API_BASE_URL } from "../../apis/apis";

const TableImage = ({ src, alt = "image", width = 50, height = 50 }) => {
  if (!src)
    return (
      <div
        className={`d-flex align-items-center justify-content-center`}
        style={{ width: `${width}px`, height: `${height}px`, fontSize: "1rem" }}
      >
        -
      </div>
    );

  return (
    <img
      src={`${API_BASE_URL}/${src}`}
      alt={alt}
      style={{ width: `${width}px`, height: `${height}px`, objectFit: "fill" }}
    />
  );
};

export default TableImage;
