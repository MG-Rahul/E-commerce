/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./UserProfile.css";
import PageTitleSetUp from "./../PageTitleSetUp";

const UserProfile = () => {
  // Scroll to top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const UserProfile = JSON.parse(localStorage.getItem("userData"));
  const { firstName, lastName, dob, gender, email } = UserProfile;

  return (
    <>
      <PageTitleSetUp title="User Profile Page" />
      <main className="container">
        <div className="userprofile-container">
          <div className="user-info">
            {UserProfile ? (
              <>
                <h1>Your Profile</h1>
                <div>
                  <p>
                    Name: {firstName} {lastName}
                  </p>

                  <p>Date of Birth: {dob}</p>
                  <p>Gender: {gender}</p>
                  <p>Email: {email}</p>
                </div>
              </>
            ) : (
              <div className="empty-profile">
                <h2>No profile found</h2>
                <p>Please log in to view your profile.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
