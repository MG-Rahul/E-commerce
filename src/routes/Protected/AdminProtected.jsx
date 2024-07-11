/* eslint-disable no-unused-vars */
import React from "react";

import { Outlet } from "react-router-dom";
import SignIn from "../../pages/SignIn/SignIn";

const AdminProtected = () => {
  // get the data from in localStorage
  const data = JSON.parse(localStorage.getItem("isAuthenticated"));
  const isAdmin = JSON.parse(localStorage.getItem("userData")).isAdmin;
  // check if the user is authenticated
  return data && isAdmin ? <Outlet /> : <SignIn />;
};

export default AdminProtected;
