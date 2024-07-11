/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { v4 as uuid } from "uuid";
import "./Cart.css";
import CartPurcess from "./CartPurcess";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitleSetUp from "./../../components/PageTitleSetUp";
const Cart = () => {
  const navigate = useNavigate();
  // Scroll to top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(products)
  const [products, setProducts] = useState();
  const [deleteAction, setDeleteAction] = useState(false);
  const [quantity, setQuantity] = useState(false);

  // Update data for each product in the cart
  useEffect(() => {
    const p = localStorage.getItem("cart");
    const data = p ? JSON.parse(p) : {};
    setProducts(Object.values(data));
  }, [deleteAction, quantity]);

  // Delete product from the cart
  const deleteProduct = (productId) => {
    setDeleteAction(productId);
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (quantity, id) => {
    const getData = JSON.parse(localStorage.getItem("cart"));
    const updateTotalPrice = getData.map((item) =>
      item.id === id
        ? { ...item, total: (item.price * quantity).toFixed(2) }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updateTotalPrice));
    setQuantity(quantity);
  };

  const toTalPrice =
    products && products.length > 0
      ? products
          .reduce((acc, curr) => acc + parseFloat(curr.total), 0)
          .toFixed(2)
      : 0;
  const totalAmount = (parseFloat(toTalPrice) + 3 + 10).toFixed(2);

  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (isAuthenticated) setAuthenticated(isAuthenticated);
  }, [authenticated]);
  const handleOrder = () => {
    navigate("/signin");
    toast.error("You must be logged in");
  };
  return (
    <div className="cart">
      <PageTitleSetUp title="Cart Page" />
      <div className="container">
        <div className="row">
          <div className="left-side">
            {products && products.length > 0 ? (
              <>
                <h1>CheckOut</h1>
                <div className="products">
                  <div className="product-text">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Delete & Favorites</p>
                    <p>Price</p>
                    <p>Total</p>
                  </div>
                  {products.map((product) => (
                    <CartPurcess
                      key={product.id}
                      product={product}
                      deleteProduct={deleteProduct}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-cart-message">
                <h1>Your cart is empty!</h1>
                <p>Why not add some amazing products to your cart?</p>
                <p>Explore our catalog and find something you&apos;ll love.</p>
                <Link to="/products" className="product-link">
                  Go to Products
                </Link>
              </div>
            )}
          </div>

          <div className="right-side">
            <div className="order-sumary">
              <h2>Order Summary</h2>
              <p>
                <span>Subtotal</span>
                {""}
                <b>
                  ${""}
                  {toTalPrice}
                </b>
              </p>
              <p>
                <span>Estimated Shipping</span>
                <b> ${toTalPrice ? 3 : 0}</b>
              </p>
              <p>
                <span>Estimated Tax</span> <b>${toTalPrice ? 10 : 0}</b>
              </p>
              <p>
                <span>Order Total</span>{" "}
                <b>
                  ${""}
                  {toTalPrice ? totalAmount : 0}
                </b>
              </p>
              <hr />
              <p>
                <span>Amount Due</span>{" "}
                <b>
                  {" "}
                  ${""}
                  {toTalPrice ? totalAmount : 0}
                </b>
              </p>
              {products && products.length > 0 ? (
                authenticated ? (
                  <Link
                    to="/cart/order/payment"
                    state={{ amountDue: totalAmount, id: uuid().slice(0, 30) }}
                  >
                    <button>Place Order</button>
                  </Link>
                ) : (
                  <Link>
                    <button onClick={handleOrder}>Place Order</button>
                  </Link>
                )
              ) : (
                <button disabled>Proceed to checkout</button>
              )}

              <Link to="/products">
                <button>Back to shopping</button>
              </Link>

              {/* <button className="clear-btn" onClick={() => localStorage.clear()}>
                Clear Cart
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
