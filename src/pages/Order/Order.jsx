/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCreditCard,
  FaInternetExplorer,
  FaGlobe,
  FaLaptop,
  FaUniversity,
  FaBuilding,
  FaLandmark,
  FaPiggyBank,
} from "react-icons/fa";
import { IoIosCall, IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import { MobileBank } from "../../assets/Images/MobileBank";
import "./Order.css";
import { toast } from "react-toastify";
import PageTitleSetUp from "./../../components/PageTitleSetUp";
console.log(MobileBank[0]);
const Order = () => {
  const location = useLocation(); ///need for amount
  const amountDue = location.state ? location.state.amountDue : 0;
  const OrderId = location.state ? location.state.id : undefined;

  const navigate = useNavigate();

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDateTime = new Date(date).toLocaleString("en-US", options);
    return formattedDateTime.replace(",", "");
  };

  const currentDateTime = formatDateTime(new Date());
  // console.log(currentDateTime); // Output: "MM/DD/YYYY HH:MM AM/PM"

  const [isProductCart, setIsProductCart] = useState();

  const fetchProduct = () => {
    // fetch product data from localStorage
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data) {
      setIsProductCart(data);
      // console.log(data);
    } else {
      setIsProductCart(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  // payment options which once active ?
  const [isActive, setIsActive] = useState("card");
  const handleActive = (value) => {
    setIsActive(value);
  };

  // is present address ?
  const [isAddressPresent, setIsAddressPresent] = useState();
  const fetchData = () => {
    // getUserAddress from localStorage
    const data = JSON.parse(localStorage.getItem("userAddress"));
    if (data) {
      const address = data.find((item) => item.selectedAddress === true);
      setIsAddressPresent(address);
      // console.log(address);
    } else {
      setIsAddressPresent(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //Order confirmation
  const handleOrderConfirmation = (method) => {
    const setOrderConfirmed = JSON.parse(localStorage.getItem("cart"));

    const prevOrder = JSON.parse(localStorage.getItem("myOrder")) || [];
    const updatedOrder = [
      ...prevOrder,
      {
        OrderId,
        method,
        isAddressPresent,
        currentDateTime,
        amountDue,
        setOrderConfirmed,
      },
    ];
    localStorage.setItem("myOrder", JSON.stringify(updatedOrder));

    toast.success("Order confirmed successfully...");
    navigate("/home");
    // before product remove from local storage
    localStorage.removeItem("cart");
    fetchProduct();
  };
  return (
    <div>
      <PageTitleSetUp title="Order Page" />
      {isProductCart ? (
        isAddressPresent ? (
          <div className="payment-container">
            <div className="left-side">
              <h2>Order Details</h2>
              <ul>
                <li>
                  <span>
                    <strong>Order ID:</strong>
                  </span>
                  {OrderId}
                </li>
                <li>
                  <span>
                    <IoMdPerson />
                  </span>
                  {isAddressPresent.firstName} {isAddressPresent.lastName}
                </li>
                <li>
                  <span>
                    <IoIosCall />
                  </span>
                  {isAddressPresent.phoneNumber}
                </li>
                <li>
                  <span>
                    <MdEmail />
                  </span>
                  {isAddressPresent.email}
                </li>
                <li>
                  <span>
                    <FaMapMarkerAlt />{" "}
                  </span>
                  {isAddressPresent.zip} {isAddressPresent.state},{" "}
                  {isAddressPresent.city},{isAddressPresent.country}
                </li>
                <li>
                  <span>
                    {" "}
                    <FaDollarSign />
                  </span>{" "}
                  ${amountDue}
                </li>
                <li>
                  <span>
                    <FaCalendarAlt />
                  </span>{" "}
                  {currentDateTime}
                </li>
              </ul>
              <div className="exit">
                <Link
                  to={{
                    pathname: "/dashboard/user/address",
                    state: { url: "editAddress" },
                  }}
                >
                  <button>Edit your Address</button>
                </Link>
              </div>
            </div>
            <div className="right-side">
              <div className="payment-options">
                <h4>Payment Method</h4>
                <div className="bank-names">
                  <h2
                    onClick={() => handleActive("card")}
                    className={isActive === "card" ? "active" : "inactive"}
                  >
                    Card
                  </h2>
                  <h2
                    onClick={() => handleActive("mobile")}
                    className={isActive === "mobile" ? "active" : "inactive"}
                  >
                    Mobile Banking
                  </h2>
                  <h2
                    onClick={() => handleActive("internet")}
                    className={isActive === "internet" ? "active" : "inactive"}
                  >
                    Internet Banking
                  </h2>
                </div>
              </div>

              {isActive === "card" && (
                <div className="account-types card">
                  <h2
                    className={isActive === "card" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("Visa Card")}
                  >
                    <span>
                      <FaCcVisa />
                    </span>
                    <p>Visa Card</p>
                  </h2>
                  <h2
                    className={
                      isActive === "mastercard" ? "active" : "inactive"
                    }
                    onClick={() => handleOrderConfirmation("Master Card")}
                  >
                    <span>
                      <FaCcMastercard />
                    </span>
                    <p>Master Card</p>
                  </h2>
                  <h2
                    className={isActive === "paypal" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("paypal")}
                  >
                    <span>
                      <FaCcPaypal />
                    </span>
                    <p>PayPal</p>
                  </h2>
                  <h2
                    className={
                      isActive === "creditcard" ? "active" : "inactive"
                    }
                    onClick={() => handleOrderConfirmation("Credit Card")}
                  >
                    <span>
                      <FaCreditCard />
                    </span>
                    <p>Credit Card</p>
                  </h2>
                </div>
              )}
              {isActive === "mobile" && (
                <div className="account-types">
                  {MobileBank ? (
                    MobileBank.map((bank) => (
                      <h2
                        key={bank.name}
                        className={
                          isActive ===
                          bank.name.toLowerCase().replace(/\s+/g, "")
                            ? "active"
                            : "inactive"
                        }
                        onClick={() => handleOrderConfirmation(bank.name)}
                      >
                        <img src={bank.img} alt={bank.name} />
                        <p>{bank.name}</p>
                      </h2>
                    ))
                  ) : (
                    <h1>No Mobile Banks Available</h1>
                  )}
                </div>
              )}
              {isActive === "internet" && (
                <div className="account-types internet">
                  <h2
                    className={isActive === "ie" ? "active" : "inactive"}
                    onClick={() =>
                      handleOrderConfirmation("Internet Explorer Banking")
                    }
                  >
                    <span>
                      <FaInternetExplorer />
                    </span>
                    <p>Internet Explorer Banking</p>
                  </h2>
                  <h2
                    className={isActive === "globe" ? "active" : "inactive"}
                    onClick={() =>
                      handleOrderConfirmation("Global Internet Banking")
                    }
                  >
                    <span>
                      <FaGlobe />
                    </span>
                    <p>Global Internet Banking</p>
                  </h2>
                  <h2
                    className={isActive === "laptop" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("Online Banking")}
                  >
                    <span>
                      <FaLaptop />
                    </span>
                    <p>Online Banking</p>
                  </h2>
                  <h2
                    className={isActive === "bank1" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("Bank of America")}
                  >
                    <span>
                      <FaUniversity />
                    </span>
                    <p>Bank of America</p>
                  </h2>
                  <h2
                    className={isActive === "bank2" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("Citibank")}
                  >
                    <span>
                      <FaBuilding />
                    </span>
                    <p>Wells Fargo</p>
                  </h2>
                  <h2
                    className={isActive === "bank3" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("Chase Bank")}
                  >
                    <span>
                      <FaLandmark />
                    </span>
                    <p>Chase Bank</p>
                  </h2>
                  <h2
                    className={isActive === "bank4" ? "active" : "inactive"}
                    onClick={() => handleOrderConfirmation("Ally Bank")}
                  >
                    <span>
                      <FaPiggyBank />
                    </span>
                    <p>Ally Bank</p>
                  </h2>
                </div>
              )}

              <div className="exit">
                <button>Exit</button>
                <p>
                  <IoIosCall className="call" />
                  16639, +8809610016639
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="add-container">
            <div className="message">
              <h2>Welcome to Your E-commerce Journey!</h2>
              <p>
                To ensure smooth delivery, please set your shipping address.
              </p>
              <Link
                to={{
                  pathname: "/dashboard/user/address",
                  state: { url: "setAddress" },
                }}
              >
                <button>Set Address Now</button>
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="empty-cart-container">
          <div className="empty">
            <h1>Your cart is empty</h1>
            <p>Need more shopping? Go to the shopping page.</p>
            <button
              className="shopping-button"
              onClick={() => navigate("/products")}
            >
              Go to Shopping Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
