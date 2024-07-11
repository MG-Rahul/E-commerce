/* eslint-disable no-unused-vars */
import React from "react";

import { Outlet } from "react-router-dom";
import SignIn from "../../pages/SignIn/SignIn";

const UserProtected = () => {
  // get the data from in localStorage
  const data = JSON.parse(localStorage.getItem("isAuthenticated"));
  // check if the user is authenticated
  return data ? <Outlet /> : <SignIn />;
};

export default UserProtected;
