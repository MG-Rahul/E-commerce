/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { toast } from "react-toastify";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import PageTitleSetUp from "./../../components/PageTitleSetUp";
const SignIn = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();

  const handleValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let error = {};
    if (!userData.email.trim()) {
      error.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail)+\.(com|org|net|edu|io|gov|mil|biz|info)$/.test(
        userData.email
      )
    ) {
      error.email = "Invalid email format";
    }

    if (!userData.password.trim()) {
      error.password = "Password is required";
    } else if (userData.password.length <= 3) {
      error.password = "Password must be at least 4 characters long";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();

    if (Object.keys(validationError).length === 0) {
      // get data from in local storage
      const storedData = JSON.parse(localStorage.getItem("userData"));
      // console.log(storedData);
      if (
        storedData &&
        storedData.email === userData.email &&
        storedData.password === userData.password
      ) {
        toast.success("Signed In Successfully!"); // user authenticated successfully

        localStorage.setItem("isAuthenticated", true); // store in true value in local storage

        navigate("/home");
      } else if (storedData) {
        // user not authenticated
        toast.error("Email or Password Invalid!");
      } else {
        toast.error("please, Frist create a new account");
        navigate("/signin");
      }

      // send API request to server for authentication
      // if successful, navigate to home page
      // if failed, display error message to user

      // clear form inputs
      setUserData({ email: "", password: "" });
    } else {
      setErrors(validationError);
    }
  };

  const handleNweAccount = (e) => {
    e.preventDefault();
    // navigate to sign up page
    navigate("/sign-up");
  };
  return (
    <>
      <PageTitleSetUp title="Sign-in Page" />
      <div className="signIn-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-container__titile">Sign In</h2>
          <div className="form-container__form-control">
            <label htmlFor="email"></label>
            <input
              type="text"
              id="email"
              name="email"
              className={`${errors ? "input-empty" : null}`}
              placeholder="Email"
              value={userData.email}
              onChange={handleValue}
              required
            />
            {errors && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-container__form-control">
            <label htmlFor="password"></label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Password"
              className={`${errors ? "input-empty" : null}`}
              value={userData.password}
              onChange={handleValue}
              required
            />
            {errors && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-container__form-control form-container__form-control--submit">
            <button type="submit">Log in</button>
          </div>
          <ul>
            <li>
              {" "}
              <Link to="/forgot-password" className="forgot">
                Forgot password?
              </Link>
            </li>
            <li>
              {" "}
              <a href="#" onClick={handleNweAccount} className="create-account">
                Create an account
              </a>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SignIn;
