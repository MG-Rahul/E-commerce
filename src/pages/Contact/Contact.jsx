/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./Contact.css";
import PageTitleSetUp from "./../../components/PageTitleSetUp";
const Contact = () => {
  // Scroll to top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Event handler for form submission

  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!contactData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]+$/.test(contactData.name.trim())) {
      errors.name = "Name can only contain alphabetic characters";
    }

    if (!contactData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^(\+)?(88)?01[0-9]{9}$/.test(contactData.phone.trim())) {
      errors.phone = "Invalid phone number format";
    }

    if (!contactData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail)+\.(com|org|net|edu|io|gov|mil|biz|info)$/.test(
        contactData.email
      )
    ) {
      errors.email = "Invalid email format";
    }

    if (!contactData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!contactData.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length === 0) {
      try {
        const response = await fetch(
          "https://e-commerce-639-default-rtdb.firebaseio.com/contacts.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        toast.success("Contact has been submitted successfully!");

        // Clear form inputs
        setContactData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        toast.error("Error submitting contact: " + error.message);
        // console.error("Error submitting contact: ", error);
      }
    } else {
      setErrors(validationError);
    }
  };

  return (
    <>
      <PageTitleSetUp title="Contact Page" />
      <div className="container">
        <div className="contact__container">
          <form action="" className="form__container" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            {/* name  */}
            <div className="form-control">
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${errors.name ? "filed-errors" : null}`}
                placeholder="Name"
                value={contactData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            {/* phone  */}
            <div className="form-control">
              <label htmlFor="phone"></label>
              <input
                type="text"
                id="phone"
                name="phone"
                className={`${errors.phone ? "filed-errors" : null}`}
                placeholder="Phone"
                value={contactData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>{" "}
            {/* email  */}
            <div className="form-control">
              <label htmlFor="email"></label>
              <input
                type="text"
                id="email"
                name="email"
                className={`${errors.email ? "filed-errors" : null}`}
                placeholder="Email"
                value={contactData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            {/* subject  */}
            <div className="form-control">
              <label htmlFor="subject"></label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={`${errors.subject ? "filed-errors" : null}`}
                placeholder="Subject"
                value={contactData.subject}
                onChange={handleChange}
                required
              />
              {errors.subject && <p className="error">{errors.subject}</p>}
            </div>
            {/* message  */}
            <div className="form-control">
              <label htmlFor="message"></label>
              <textarea
                id="message"
                name="message"
                rows={7}
                className={`${errors.message ? "filed-errors" : null}`}
                placeholder="Message"
                value={contactData.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && <p className="error">{errors.message}</p>}
            </div>
            <div className="form-control ">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
