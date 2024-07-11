/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { toast } from "react-toastify";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import PageTitleSetUp from "../../components/PageTitleSetUp";
const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: "",
  });
  const [errors, setErrors] = useState();

  const handleValue = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let error = {};
    if (!email.email.trim()) {
      error.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail)+\.(com|org|net|edu|io|gov|mil|biz|info)$/.test(
        email.email
      )
    ) {
      errors.email = "Invalid email format";
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
      if (storedData && storedData.email === email.email) {
        navigate(`/sign-up/${storedData.email}`);
      } else {
        // user not authenticated
        toast.error("Email or Password Invalid!");
        navigate("/forgot-password");
      }

      // send API request to server for authentication
      // if successful, navigate to home page
      // if failed, display error message to user

      // clear form inputs
      setEmail({ email: "" });
    } else {
      setErrors(validationError);
    }
  };

  return (
    <div className="signIn-container">
      < PageTitleSetUp title='Forgot Password Page' />
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-container__titile">Forgot Password</h2>
        <div className="form-container__form-control">
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            name="email"
            className={`${errors ? "input-empty" : null}`}
            placeholder="Email"
            value={email.email}
            onChange={handleValue}
            required
          />
          {errors && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-container__form-control form-container__form-control--submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
