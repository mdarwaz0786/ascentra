/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = ({ url, token, params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url, {
          headers: token
            ? { Authorization: token }
            : {},
          params,
        });

        if (response?.data?.success) {
          setData(response?.data);
        };
      } catch (error) {
        setError(error?.response?.data?.message || "Error while fetching data");
      } finally {
        setIsLoading(false);
      };
    };

    if (url) {
      fetchData();
    };
  }, [url, JSON.stringify(params)]);

  return { data, isLoading, error };
};

export default useFetchData;