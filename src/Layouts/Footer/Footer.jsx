/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="social-media">
        <a
          href="https://www.facebook.com/mgrahul639/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/mgraful639/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/mgrahul639/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/MG-Rahul"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
      <p>&copy; 2024 My Website. All rights reserved.</p>
      <p>
        Designed by{" "}
        <a href="https://www.facebook.com/mgrahul639/" target="_blank">
          MG
        </a>
      </p>
      <p>Powered by React</p>
      <p>
        <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a> |{" "}
        <Link to='/contact'>Contact Us</Link>
      </p>
    </div>
  );
};

export default Footer;
