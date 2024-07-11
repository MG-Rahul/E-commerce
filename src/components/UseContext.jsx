/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";
import FetchDataApi from "./FetchDataApi";

const ProductsContext = createContext();

// Add hook to use products data
export const useProducts = () => {
  return useContext(ProductsContext);
};

// Add root component for ProductsProvider
export const ProductsProvider = ({ children }) => {
  const [product, setProduct] = useState();
  const {
    data: productsData,
    isLoaded: productsLoaded,
    error: productsError,
  } = FetchDataApi('https://dummyjson.com/products?limit=0&skip=0');
  const {
    data: categoriesData,
    isLoaded: categoriesLoaded,
    error: categoriesError,
  } = FetchDataApi("https://dummyjson.com/products/categories");

  const products = productsData?.products || [];
  const categories = categoriesData || [];

  //console.log(categoriesData);
  // console.log(product);
  return (
    <ProductsContext.Provider
      value={{
        products,
        productsLoaded,
        productsError,
        categories,
        categoriesLoaded,
        categoriesError,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
