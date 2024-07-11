/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

import logo from "../../assets/Images/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Navigation menu starts here
  const [toggle, setToggle] = useState(false);
  const handleToggle = (e) => {
    e.stopPropagation(); // Corrected typo here
    setToggle(!toggle);
  };

  // when click the list the navigation bar is hidden
  const handleCloseToToggle = () => {
    window.innerWidth <= 768 ? setToggle(!toggle) : null;
  };

  // screensize calculations for navigation bar toggle buttons
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setToggle(false);
    } else {
      setToggle(true);
    }
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width < 768) {
        setToggle(false);
      } else {
        setToggle(true);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  // close the navigation bar when clicked outside the navigation bar
  const handleClickOutside = (e) => {
    if (window.innerWidth <= 768) {
      const className = e.target.className;
      if (
        (typeof className === "string" && className.includes("nav-container")) ||
        (typeof className === "string" && className.includes("menu-bar"))
      ) {
        return;
      }
      setToggle(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // Navigation menu ends here

  // isAuthenticated starts here
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const getData = () => {
    const data = localStorage.getItem("isAuthenticated"); // userData from localStorage
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  };
  useEffect(() => {
    // Initial data fetch
    const initialData = getData();
    setIsAuthenticated(initialData);

    // Only set up the interval if no data is found initially
    if (!initialData) {
      const intervalId = setInterval(() => {
        const data = getData();
        if (data) {
          setIsAuthenticated(data);
          clearInterval(intervalId); // Clear the interval once data is found
        }
      }, 2000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);
  // isAuthenticated ends here

  //Profile handle starts here
  const [showProfile, setShowProfile] = useState(false);
  const handleProfile = (e) => {
    e.stopPropagation(); // Corrected typo here
    setShowProfile(!showProfile);
  };
  const handleProfileList = (e) => {
    e.stopPropagation(); // Corrected typo here
    setShowProfile(!showProfile);
  };

  const handleClickOutsideProfile = (e) => {
    e.stopPropagation();
    const className = e.target.className;

    // Ensure className is a string before using includes
    if (
      (typeof className === "string" &&
        className.includes("profile-dropdown")) ||
      (typeof className === "string" &&
        className.includes("profile-dropdown__list-item"))
    ) {
      return;
    }

    setShowProfile(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideProfile);
    return () => {
      document.removeEventListener("click", handleClickOutsideProfile);
    };
  }, []);
  //Profile handle ends here

  //handle LogOut profile
  const handleLogOut = (e) => {
    e.stopPropagation(); // Corrected typo here
    localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("userData");
    setIsAuthenticated(null);

    navigate("/home");
    window.location.reload(); // Reload the page to clear the user data
  };
  return (
    <>
      <ToastContainer />
      <header>
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>
        <>
          {toggle ? (
            <>
              <div className=" menu-bar" onClick={handleToggle}>
                <IoClose />
              </div>
              <nav className={`nav-container ${toggle ? "open" : ""}`}>
                <ul>
                  {/* home  */}
                  <li
                    className="nav-container__list-Item"
                    onClick={handleCloseToToggle}
                  >
                    <NavLink
                      to="/home"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* products  */}
                  <li
                    className="nav-container__list-Item"
                    onClick={handleCloseToToggle}
                  >
                    <NavLink
                      to="/products"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Products
                    </NavLink>
                  </li>

                  

                  {/* contact  */}
                  <li
                    className="nav-container__list-Item"
                    onClick={handleCloseToToggle}
                  >
                    <NavLink
                      to="/contact"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Contact
                    </NavLink>
                  </li>

                  {/* cart  */}
                  <li
                    className="nav-container__list-Item"
                    onClick={handleCloseToToggle}
                  >
                    <NavLink
                      to="/cart"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Cart
                    </NavLink>
                  </li>

                  {/* account  */}
                  <li className="nav-container__list-Item">
                    {isAuthenticated ? (
                      <div className="profile">
                        <div className="profile_logo" onClick={handleProfile}>
                          <IoPerson size={25} />
                        </div>
                        {showProfile && (
                          <div className="profile-dropdown">
                            <ul className="profile-dropdown__item">
                              <li onClick={handleProfileList}>
                                <Link to="dashboard/user/profile">Profile</Link>
                              </li>
                              <li onClick={handleProfileList}>
                                {" "}
                                <Link to="dashboard/user/orders">
                                  My Orders
                                </Link>
                              </li>

                              <li onClick={handleProfileList}>
                                <Link to="dashboard/user/favorites">
                                  My Favorites
                                </Link>
                              </li>

                              <li onClick={handleProfileList}>
                                <Link to="dashboard/user/returns">
                                  My Returns
                                </Link>
                              </li>

                              <li onClick={handleProfileList}>
                                <Link to="dashboard/user/coupons">
                                  My Coupons
                                </Link>
                              </li>

                              <li onClick={handleProfileList}>
                                <Link to="dashboard/user/address">
                                  My Address
                                </Link>
                              </li>
                              <li onClick={handleProfileList}>
                                <Link onClick={handleLogOut}>Logout</Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to="/signin"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Sign In
                      </NavLink>
                    )}
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <div className="menu-bar" onClick={handleToggle}>
              <IoMenu />
            </div>
          )}
        </>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
