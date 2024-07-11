/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import PageTitleSetUp from "./../../components/PageTitleSetUp";

const CartPurcess = ({ product, deleteProduct, updateQuantity }) => {
  const { id, quantity, price, total, title, thumbnail, isFavorite } = product;
  const [favorite, setIsFavorite] = useState(isFavorite);
  const [qnty, setQuantity] = useState(quantity);

  // Product increase quantity
  const handleQuantity = (action, id) => {
    if (action === "add") {
      setQuantity((prevQuantity) => prevQuantity + 1);
      updateQuantity(qnty + 1, id);
      const getData = JSON.parse(localStorage.getItem("cart"));
      const updatedData = getData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedData));
    } else if (action === "sub" && qnty > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateQuantity(qnty - 1, id);
      const getData = JSON.parse(localStorage.getItem("cart"));
      const updatedData = getData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedData));
    }
  };

  // Remove product
  const handleRemoveProduct = (productId) => {
    const getData = JSON.parse(localStorage.getItem("cart"));
    const updatedData = getData.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    deleteProduct(productId);
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!favorite);
    const getData = JSON.parse(localStorage.getItem("cart"));
    const updatedData = getData.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedData));
  };

  return (
    <>
      <PageTitleSetUp title="Cart page" />
      <div key={product.id} className="product">
        <div className="product-img">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="product-quantity">
          <IoMdAdd className="add" onClick={() => handleQuantity("add", id)} />
          <span>{qnty}</span>
          <RiSubtractFill
            className="sub"
            onClick={() => handleQuantity("sub", id)}
          />
        </div>
        <div className="product-delete">
          <MdDelete
            className="delete"
            onClick={() => handleRemoveProduct(id)}
          />
          {favorite ? (
            <MdFavorite
              color="#f50057"
              onClick={() => toggleFavorite(product.id)}
              className="favorites"
            />
          ) : (
            <MdFavoriteBorder
              size={20}
              onClick={() => toggleFavorite(product.id)}
              className="favorites"
            />
          )}
        </div>
        <div className="product-price">${price}</div>
        <div className="product-total">${total}</div>
      </div>
    </>
  );
};

export default CartPurcess;
