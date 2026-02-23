import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useToggleStatus = ({ token, refetch }) => {
  const [toggling, setToggling] = useState({});

  const toggleStatus = async (url, id, currentStatus) => {
    try {
      setToggling((prev) => ({ ...prev, [id]: true }));

      const response = await axios.patch(
        `${url}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: token } }
      );

      if (response?.data?.success) {
        toast.success("Updated Successfully");
        refetch();
      };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error while updating");
    } finally {
      setToggling((prev) => ({ ...prev, [id]: false }));
    };
  };

  return {
    toggling,
    toggleStatus,
  };
};

export default useToggleStatus;
