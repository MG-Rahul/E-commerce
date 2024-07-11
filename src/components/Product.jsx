/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import PageTitleSetUp from './PageTitleSetUp';

const Product = ({ product }) => {
  const {
    id,
    title,
    price,
    description,
    category,
    rating,
    stock,
    brand,
    images,
    thumbnail,
    reviews,
  } = product;
  // Initialize state for cart items
  const [addToCart, setAddToCart] = useState(null);

  // Function to handle adding a product to cart
  /* const handleAddToCart = (id) => {
    const newProduct = {
      id: id,
      quantity: 1,
      price: price,
      total: price,
      title: title,
      thumbnail: thumbnail,
      isFavorite: false,
    };
    const isAddToCart = localStorage.getItem("cart");
    // check already added the product then do not add the product

    if (isAddToCart) {
      const parsedData = JSON.parse(isAddToCart);
      const productExists = parsedData.some((item) => item.id === id);
      if (productExists) {
        toast.error(`${title} already exists in the cart`);
        return;
      } else {
        const newCart = [...parsedData, newProduct];
        localStorage.setItem("cart", JSON.stringify(newCart));
        toast.success(`Added ${title} to cart`);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([newProduct]));
      toast.success(`Added ${title} to cart`);
    }
  };
*/

  // Function to handle adding a product to cart
  const handleAddToCart = (id) => {
    const newProduct = {
      id: id,
      quantity: 1,
      price: price,
      total: price,
      title: title,
      thumbnail: thumbnail,
      isFavorite: false,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productExists = cart.some((item) => item.id === id);
    if (productExists) {
      toast.error(`${title} already exists in the cart`);
    } else {
      cart.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`Added ${title} to cart`);
    }
  };

  const handleBuyToProduct = (e) => {
    // Add product to cart functionality
    console.log(`Buying product: ${title}`);
    toast.success("Product has been successfully");
  };
  return (
    <><PageTitleSetUp title='Product Page' /><article className="product-container">
      <Link to={`/products/product/${id}`} state={product}>
        {" "}
        <img src={thumbnail} alt={title} className="product-container__image" />
      </Link>
      <div className="product__info">
        <h4>{title}</h4>
        <p>
          <strong>Price: </strong>${price}
        </p>
        <p>
          <strong>Rating: </strong>
          {rating} out of 5
        </p>
        <p>
          <strong>Categories:</strong>
          {category}{" "}
        </p>
        <p>
          <strong>Description: </strong>
          {description.substr(0, 50)}...
          <small className="small">
            <Link to={`/products/product/${id}`} state={product}>
              Read More
            </Link>
          </small>
        </p>
      </div>
      <div className="product_btn">
        <button className="buy" onClick={handleBuyToProduct}>
          Buy Now
        </button>
        <button className="add-to-cart" onClick={() => handleAddToCart(id)}>
          Add to cart
        </button>
      </div>
    </article></>
  );
};

export default Product;
