/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import "./Products.css";
import { useProducts } from "../../components/UseContext";
import Product from "../../components/Product";
import PageTitleSetUp from "./../../components/PageTitleSetUp";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Products = () => {
  const query = useQuery();
  const url = query.get("category");
  const navigate = useNavigate();
  // console.log(url);

  // component mounted then scrollbar top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    products,
    productsLoaded,
    productsError,
    categories,
    categoriesLoaded,
    categoriesError,
  } = useProducts();
  const [toggle, setToggle] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [filterProducts, setFilterProducts] = useState(null);

  // navigation bar toggle
  const handleToggle = (e) => {
    e.stopPropagation(); // Corrected typo here
    setToggle(!toggle);
  };

  // handle url products
  useEffect(() => {
    // console.log(url);
    if (url) {
      setFilterProducts(url);
      setIsCategory(false);
    } else {
      setFilterProducts(null);
    }
  }, [products, url]);

  // handle filtering all products
  const handleFilterCategoryAll = () => {
    setToggle(false);
    setIsCategory(true);
    setFilterProducts(null);
    navigate("/products");
  };

  // handle filtering products by category
  const handleFilterCategory = (e) => {
    // console.log(e);
    setToggle(false);
    setFilterProducts(e);
    setIsCategory(false);
    // fetchData(e);
  };

  // URLSearchParams filter products

  // screen size 992px then i don't show the category content
  const [isLarge, setIsLarge] = useState(window.innerWidth <= 992);
  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth <= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Outside click then toggle the navigation bar close
  // const handleClickOutside = (e) => {
  //   if (window.innerWidth <= 992) {
  //     if (e.target.className.includes("toggle")) {
  //       setToggle(false);
  //       console.log("object");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  //

  // search filter products
  const [search, setSearch] = useState(null);
  const handldeSearchValue = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    // console.log(filterProducts)
  }, [search]);

  return (
    <div className="container ">
      <PageTitleSetUp title="Product page" />
      {/* <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handldeSearchValue(e)}
        />
        <IoSearch className="search-icon" />
      </div> */}
      <div className="row">
        {/* Categories show here  */}
        <div className="col-2 catescrol">
          {!isLarge ? (
            <div className="category">
              <h2>Categories</h2>
              {/* <IoMenu className="menu-icon menuBar" />
            <IoClose className="menu-icon closeBar" /> */}
              <ul className="category-list">
                <li onClick={handleFilterCategoryAll} className="link-list">
                  All
                </li>{" "}
                {/* slug	"sports-accessories"  name	"Sports Accessories"  url	"https://dummyjson.com/pr…egory/sports-accessories" */}
                {categoriesLoaded ? (
                  <p>Loading...</p>
                ) : categoriesError ? (
                  <p>{categoriesError.message}</p>
                ) : (
                  categories &&
                  categories.map((category) => {
                    const { slug, name, url } = category;
                    //if name is mens and womens then return once time is passed another time is null
                    return (
                      <li
                        key={slug}
                        onClick={() => handleFilterCategory(slug)}
                        className="link-list"
                      >
                        {name}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          ) : (
            <div className="category">
              <h2>Categories</h2>
              <div className="toggle" onClick={handleToggle}>
                {!toggle ? (
                  <IoMenu size={25} className="menuBar" />
                ) : (
                  <IoClose size={25} className="menuBar" />
                )}
              </div>
              {/* <IoMenu className="menu-icon menuBar" />
            <IoClose className="menu-icon closeBar" /> */}
              <ul
                className={
                  !toggle
                    ? `category-list ${"inactive"}`
                    : `category-list ${"active"}`
                }
              >
                {" "}
                {/* slug	"sports-accessories"  name	"Sports Accessories"  url	"https://dummyjson.com/pr…egory/sports-accessories" */}
                {categoriesLoaded ? (
                  <p>Loading...</p>
                ) : categoriesError ? (
                  <p>{categoriesError.message}</p>
                ) : (
                  categories &&
                  categories.map((category) => {
                    const { slug, name, url } = category;
                    //if name is mens and womens then return once time is passed another time is null
                    return (
                      <li
                        key={slug}
                        onClick={() => handleFilterCategory(slug)}
                        className="link-list"
                      >
                        {name}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Products show here  */}
        <div className="col-10">
          <h2>Products</h2>
          {productsLoaded ? (
            <p>Loading...</p>
          ) : productsError ? (
            <p>{productsError.message}</p>
          ) : (
            <div className="products">
              {isCategory ? (
                products && products.length > 0 ? (
                  products.map((product) => (
                    <Product key={product.id} product={product} />
                  ))
                ) : (
                  <p>Product not found!</p>
                )
              ) : filterProducts && filterProducts.length > 0 ? (
                products.map((product) => {
                  // Check if category is already selected and remove existing category
                  const category = product.category;
                  if (filterProducts === category) {
                    return <Product key={product.id} product={product} />;
                  }

                  // return <Product key={product.id} product={product} />;
                })
              ) : (
                <p>Product not found!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
