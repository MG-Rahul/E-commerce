/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

const OrderProtected = () => {
  const data = JSON.parse(localStorage.getItem("cart"));
  // check if the user is authenticated
  return data.length > 0 ? <Outlet /> : <h1>404 Not Found Page</h1>;
};

export default OrderProtected;
