/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import "./UserOrder.css";
import PageTitleSetUp from './../PageTitleSetUp';
const UserOrder = () => {
    // Scroll to top of the page on page load
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const order = JSON.parse(localStorage.getItem("myOrder"));
  const [isOreder, setIsOreder] = useState(order);
  const userProfile = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    //get order from local storage
  }, []);

  // see order details
  const [showOrder, setShowOrder] = useState(null);

  const handleShowOrderDetails = (id) => {
    console.log(id);
    setShowOrder(id);
  };

  const handleCloseProductDetails = () => {
    setShowOrder(null);
  };

  // Outside click then setShowOrder is null

  return (
    <><PageTitleSetUp title='User Order Page' /><div className="container">
      <main className="order-container">
        <>
          {isOreder ? (
            <>
              <h2>Your Order:</h2>
              <div className="order-information">
                <table>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Order Item</th>
                      <th>Payment Method</th>
                      <th>Amount</th>
                      <th>Current Date</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Order Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isOreder.map((element) => {
                      const {
                        OrderId, method, amountDue, currentDateTime, setOrderConfirmed, isAddressPresent,
                      } = element;

                      return (
                        <tr key={OrderId}>
                          <td>
                            {userProfile.firstName} {userProfile.lastName}{" "}
                          </td>
                          <td>{setOrderConfirmed.length}</td>
                          <td>{method}</td>
                          <td>${amountDue}</td>
                          <td>{currentDateTime}</td>
                          <td>
                            {isAddressPresent.address},{isAddressPresent.zip}{" "}
                            {isAddressPresent.state} {isAddressPresent.city}{" "}
                            {isAddressPresent.country}
                          </td>
                          <td>{isAddressPresent.phoneNumber}</td>
                          <td>
                            <button
                              onClick={() => handleShowOrderDetails(OrderId)}
                            >
                              Show Oreder Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {showOrder ? (
                <>
                  {console.log(showOrder)}
                  <div className="order-details-show">
                    <div className="order-header">
                      <h2>Order Details</h2>
                      <button onClick={handleCloseProductDetails}>
                        <IoMdClose size={25} />
                      </button>
                    </div>
                    <div className="order-details">
                      <div className="order-product">
                        {isOreder.map((item) => {
                          const {
                            OrderId, method, amountDue, currentDateTime, setOrderConfirmed, isAddressPresent,
                          } = item;
                          if (OrderId === showOrder)
                            return (
                              <React.Fragment key={OrderId}>
                                {setOrderConfirmed.map((product) => {
                                  const {
                                    id, price, quantity, thumbnail, title, total,
                                  } = product;
                                  return (
                                    <div className="product" key={id}>
                                      <div className="product-img-name">
                                        <div className="product-img">
                                          <img src={thumbnail} alt={title} />
                                        </div>
                                        <h5>{title}</h5>
                                      </div>
                                      <p>Price: ${price}</p>
                                      <p>Quantity: {quantity}</p>
                                      <p>Total: ${total}</p>
                                    </div>
                                  );
                                })}
                              </React.Fragment>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <Link to="/home">
                <button className="back-home">Back to Home</button>
              </Link>
            </>
          ) : (
            <h2>No Order Found</h2>
          )}
        </>
      </main>
    </div></>
  );
};

export default UserOrder;
