/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "../../assets/Images/Carousel-Image";
import { CategoryProductList } from "../../assets/Images/CategoryProductList";

import "./Home.css";
import { Link } from "react-router-dom";
import PageTitleSetUp from "../../components/PageTitleSetUp";
const Home = () => {
  // Scroll to top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Set the speed for autoplay (in milliseconds)
  };

  return (
    <div className="home">
      <PageTitleSetUp title="Home Page" />
      <div className="home-container">
        <div className="slider">
          <Slider {...settings}>
            {Carousel.map((item, index) => (
              <div key={index} className="slide">
                <Link to="/products">
                  {" "}
                  <img src={item.img} alt={item.name} />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <main>
        <section className="home-category container">
          <h2 className="title">Categories</h2>
          <div className="category-list">
            {CategoryProductList.map((item, index) => (
              <Link to={`/products?category=${item.category}`} key={index}>
                <div className="category">
                  <img src={item.img} alt="" />
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

// <Link to={`/products?category=${item.slug}`} key={index}>
// <div className="category">{item.name}</div>
// </Link>
