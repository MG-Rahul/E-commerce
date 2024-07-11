/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

const Protected = () => {
  // get the data from in localStorage
  const data = JSON.parse(localStorage.getItem("isAuthenticated"));
  // check if the user is authenticated
  return data ? <h1>404 Not Found Page</h1> : <Outlet />;
};

export default Protected;
