/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import PageTitleSetUp from './PageTitleSetUp';

const SignUp = () => {
  let { email } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const handleValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!userData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(userData.firstName.trim())) {
      errors.firstName = "Name can only contain alphabetic characters";
    }

    if (!userData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(userData.lastName.trim())) {
      errors.lastName = "Last name can only contain alphabetic characters";
    }
    if (!userData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail)+\.(com|org|net|edu|io|gov|mil|biz|info)$/.test(
        userData.email
      )
    ) {
      errors.email = "Invalid email format";
    }
    if (!userData.password.trim()) {
      errors.password = "Password is required";
    } else if (userData.password.length <= 3) {
      errors.password = "Password must be at least 4 characters long";
    }
    if (!userData.dob.trim()) {
      errors.dob = "Date of birth is required";
    }
    if (!userData.gender.trim()) {
      errors.gender = "Gender is required";
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (Object.keys(validationError).length === 0) {
      try {
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", true);

        // Notify the user and navigate to the home page
        toast.success("User registered successfully!");

        // Redirect to the home page after successful registration
        navigate("/home");
        const response = await fetch(
          "https://e-commerce-639-default-rtdb.firebaseio.com/users.json",
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to save user data");
        }
      } catch (error) {
        // Handle any errors that occur during storage
        // console.error("Failed to store user data:", error);

        // Notify the user and navigate back to the signup page
        toast.error("Failed to register user!");

        // Redirect back to the signup page after failed registration
        navigate("/sign-up");
      }
      //clear  user data
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
      });
    } else {
      setErrors(validationError);
    }
  };

  const fetchUseParams = () => {
    if (email) {
      //get data from local storage
      const storedData = JSON.parse(localStorage.getItem("userData"));
      // console.log(storedData);
      if (storedData && storedData.email === email) {
        setUserData({ ...storedData });
      } else {
        toast.error("Invalid email or password!"); // user authenticated successfully
        navigate("/sign-up");
      }
    }  
  };
  useEffect(() => {
    fetchUseParams();
  }, []);

  return (
    <><PageTitleSetUp title='Sign Up Page' /><div className="signIn-container">
      <form action="" className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-container__titile">Sign Up</h2>
        {/* name frist and last  */}
        <div className="form-container__form-control">
          <div className="col-divided">
            <div className="col-container">
              <label htmlFor="firstName">Frist Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`${errors.firstName ? "input-empty" : ""}`}
                placeholder="First Name"
                value={userData.firstName}
                onChange={handleValue}
                required />
              {errors && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="col-container">
              {" "}
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`${errors.lastName ? "input-empty" : ""}`}
                placeholder="Last Name"
                value={userData.lastName}
                onChange={handleValue}
                required
              ></input>
              {errors && <p className="error">{errors.lastName}</p>}
            </div>
          </div>
        </div>

        {/* email */}
        <div className="form-container__form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className={`${errors.email ? "input-empty" : ""}`}
            placeholder="Email"
            value={userData.email}
            onChange={handleValue}
            required />
          {errors && <p className="error">{errors.email}</p>}
        </div>

        {/* password */}
        <div className="form-container__form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`${errors.password ? "input-empty" : ""}`}
            placeholder="Password"
            value={userData.password}
            onChange={handleValue}
            required />
          {errors && <p className="error">{errors.password}</p>}
        </div>

        {/* date of birth */}
        <div className="form-container__form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className={`${errors.dob ? "input-empty" : ""}`}
            placeholder="Date of birth"
            value={userData.dob}
            onChange={handleValue}
            required />
          {errors && <p className="error">{errors.dob}</p>}
        </div>

        {/* gender */}
        <div className="form-container__form-control">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className={`${errors.gender ? "input-empty" : ""}`}
            placeholder="gender"
            value={userData.gender}
            onChange={handleValue}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors && <p className="error">{errors.gender}</p>}
        </div>

        {/* submit */}
        <div className="form-container__form-control form-container__form-control--submit">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div></>
  );
};

export default SignUp;
