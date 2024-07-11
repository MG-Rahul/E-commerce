/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const FetchDataApi = (api) => {
  // console.log(api);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [api]);

  return { data, isLoaded, error };
};

export default FetchDataApi;




 