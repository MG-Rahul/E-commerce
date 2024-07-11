/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./UserAddress.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function
import PageTitleSetUp from './../PageTitleSetUp';
const UserAddress = () => {
  // show the user address
  const [isActive, setIsActive] = useState("addressList");
  const [userAddress, setUserAddress] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    state: "",
    id: uuidv4().slice(0, 10),
    selectedAddress: true,
  });
  const [showAddressList, setShowAddressList] = useState();

  //active state
  const handleAddress = (newState) => {
    setIsActive(newState);
  };

  // collect the user addresses
  const handleChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //duplicate data removed
    const getUserAddress =
      JSON.parse(localStorage.getItem("userAddress")) || [];

    // Filter out any address with the same ID as the current userAddress
    const updateUserAddress = getUserAddress.filter(
      (item) => item.id !== userAddress.id
    );
    const updateAddressWithSelect = updateUserAddress.map((item) => {
      return {
        ...item,
        selectedAddress: false,
      };
    });

    // Add the new userAddress to the updated array
    updateAddressWithSelect.push(userAddress);

    // Store the updated array back to local storage
    localStorage.setItem(
      "userAddress",
      JSON.stringify(updateAddressWithSelect)
    );

    // Call handleAddress function because which on active ?
    handleAddress("addressList");

    // Clear form fields and reset the ID
    setUserAddress({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      country: "",
      zip: "",
      state: "",
      id: uuidv4().slice(0, 10), // Generate a new ID for the next entry
      selectedAddress: true,
    });

    // call the fetchData function beacuse state update that can show update results
    fetchData();
  };

  //fetch user address from local storage using by useEffect hock
  const fetchData = () => {
    const data = JSON.parse(localStorage.getItem("userAddress"));
    if (data) {
      setShowAddressList(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [setIsActive]);

  // Edit the address
  const handleEditAddress = (data) => {
    handleAddress("addAddress");
    const getUserAddress = JSON.parse(localStorage.getItem("userAddress"));
    const userAddress = getUserAddress.find((item) => item.id === data);
    if (userAddress) {
      userAddress.selectedAddress = true;
    }
    setUserAddress(userAddress);
  };

  // Delete the address
  const handleDeleteAddress = (id) => {
    // console.log(id);
    //confirm('Are you sure you want to delete this address')
    if (confirm("Are you sure you want to delete this address?")) {
      const getUserAddress = JSON.parse(localStorage.getItem("userAddress"));
      const updateUserAddress = getUserAddress.filter((item) => item.id !== id);
      localStorage.setItem("userAddress", JSON.stringify(updateUserAddress));
      fetchData();
    }
  };

  // Select the address
  const handleSelectAddress = (id) => {
    console.log(id);
    const getUserAddress = JSON.parse(localStorage.getItem("userAddress"));
    console.log(getUserAddress);
    const userAddress = getUserAddress.map((item) => {
      return item.id === id
        ? { ...item, selectedAddress: true }
        : { ...item, selectedAddress: false };
    });
    localStorage.setItem("userAddress", JSON.stringify(userAddress));

    fetchData();

    //update the userAddress
  };
  console.log(showAddressList);
  return (
    <><PageTitleSetUp title='User Address Page' /><div className="container">
      <div className="address-container">
        <h2>Address Book</h2>
        <div className="button-list">
          <button
            onClick={() => handleAddress("addressList")}
            className={isActive === "addressList" ? "active" : "inactive"}
          >
            Addres list
          </button>
          <button
            onClick={() => handleAddress("addAddress")}
            className={isActive === "addAddress" ? "active" : "inactive"}
          >
            Add Address
          </button>
        </div>
        {isActive === "addressList" && (
          <>
            <div className="address-list">
              {showAddressList !== undefined ? (
                showAddressList.map((item) => {
                  return (
                    <div className="address" key={item.id}>
                      <div className="select">
                        <input
                          type="radio"
                          id={`select-${item.id}`}
                          name="selectedAddress"
                          className="radio-checkbox"
                          checked={item.selectedAddress}
                          onChange={() => handleSelectAddress(item.id)} />

                        <label
                          htmlFor={`select-${item.id}`}
                          className="radio-label"
                        >
                          {item.selectedAddress ? (
                            <>Select this Addrerss</>
                          ) : null}
                        </label>
                      </div>

                      <div className="addres-name">
                        <p>Address: </p>
                        <p>
                          {item.address} {item.city} {item.state} {item.zip}{" "}
                          {item.country}
                        </p>
                      </div>
                      <div className="addres-phone">
                        <p>Phone Number: </p> <p>{item.phoneNumber}</p>
                      </div>
                      <div className="addres-name">
                        <p>Email: </p> <p>{item.email}</p>
                      </div>
                      <div className="btton">
                        <p>
                          {" "}
                          {/* edit delete  */}
                          <Link>
                            <button onClick={() => handleEditAddress(item.id)}>
                              Edit address
                            </button>
                          </Link>
                          <Link>
                            <button
                              onClick={() => handleDeleteAddress(item.id)}
                            >
                              Delete address
                            </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3>There is No Set in Address</h3>
              )}
            </div>
          </>
        )}
        {isActive === "addAddress" && (
          <div className="add-address">
            <div className="form">
              <form onSubmit={(e) => handleSubmit(e)}>
                {/* Frist name  and last name */}
                <div className="form-control">
                  <div>
                    <label htmlFor="firstName">Frist Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Frist Name"
                      value={userAddress.firstName}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={userAddress.lastName}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                </div>
                {/* Address  and city */}
                <div className="form-control">
                  <div>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={userAddress.address}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={userAddress.city}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={userAddress.country}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                </div>
                {/* State  and zip */}
                <div className="form-control">
                  <div>
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="State"
                      value={userAddress.state}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                  <div>
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="Zip"
                      value={userAddress.zip}
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                </div>
                {/* Phone number */}
                <div className="form-control phone">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="phone"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={userAddress.phoneNumber}
                    onChange={(e) => handleChange(e)}
                    required />
                </div>
                {/* email  */}
                <div className="form-control email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={userAddress.email}
                    onChange={(e) => handleChange(e)}
                    required />
                </div>
                {/* submit button */}
                <div className="form-control form-control--submit">
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div></>
  );
};

export default UserAddress;
