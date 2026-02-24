/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetchData = ({ url, token, params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(url, {
        headers: token ? { Authorization: token } : {},
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
  }, [url, token, JSON.stringify(params)]);

  useEffect(() => {
    if (url) {
      fetchData();
    };
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetchData;