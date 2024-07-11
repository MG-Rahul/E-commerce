/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitleSetUp from "./PageTitleSetUp";

const ProductShow = () => {
  //when this component is mounted then i wnat to the scrollbar is top position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get the id from the url state
  const { state } = useLocation();
  //console.log(state);
  const {
    id,
    title,
    price,
    discountPercentage,
    description,
    category,
    rating,
    stock,
    brand,
    images,
    thumbnail,
    reviews,
  } = state;

  // quantity hanlde starts here
  const decrement = useRef(null); // for styling purposes only
  const increment = useRef(null); // for styling purposes only
  const [number, setNumber] = useState(1);
  const Stock = 5; // Define the max stock value
  const handleIncrement = () => {
    if (number < Stock) {
      setNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        if (newNumber >= Stock) {
          increment.current.classList.add("disabled");
        }
        decrement.current.classList.remove("disabled");
        return newNumber;
      });
    }
  };
  const handleDecrement = () => {
    if (number > 1) {
      setNumber((prevNumber) => {
        const newNumber = prevNumber - 1;
        if (newNumber <= 1) {
          decrement.current.classList.add("disabled");
        }
        increment.current.classList.remove("disabled");
        return newNumber;
      });
    }
  };
  // quantity hanlde ends here

  // shoping handle starts here
  const handleBuyToProduct = () => {
    console.log(`Adding product: ${title} to cart`);
  };

  // Function to handle adding a product to cart
  const handleAddToCart = (id, qnty) => {
    const newProduct = {
      id: id,
      quantity: qnty,
      price: price,
      total: (price * qnty).toFixed(2),
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

  // shoping handle ends here
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    return formattedDate;
  };

  useEffect(() => {}, []);
  return (
    <>
      <PageTitleSetUp title="Product Details Page" />
      <div className="container">
        <div className="singleProduct">
          <div className="col">
            <div className="product__text">
              <div className="left-side">
                <img src={thumbnail} alt={title} />
                <div className="smal__image">
                  <img src={images[0]} alt={title} />
                  <img src={images[0]} alt={title} />
                  <img src={images[0]} alt={title} />
                  <img src={images[0]} alt={title} />
                  <img src={images[0]} alt={title} />
                </div>
              </div>
              <div className="middle-side">
                {" "}
                <h3>{title}</h3>
                <p>
                  <strong>Brand: </strong> {brand}
                </p>
                <p>
                  <strong>Price: </strong>: ${price}
                </p>
                <p>
                  <strong>Discount: </strong> {discountPercentage}%{" "}
                </p>
                <p>
                  {" "}
                  <strong>Stock: </strong> {stock}
                </p>
                <p>
                  {" "}
                  <strong>Rating: </strong> {rating}
                </p>
                <p>
                  {" "}
                  <strong>Category: </strong> {category}
                </p>
                <div className="quantity">
                  <strong>Quantity:</strong>
                  <p
                    onClick={handleDecrement}
                    className="decrement"
                    ref={decrement}
                  >
                    -
                  </p>
                  <p>{number}</p>
                  <p
                    onClick={handleIncrement}
                    className="increment"
                    ref={increment}
                  >
                    +
                  </p>
                </div>
                {/* <button onClick={() => window.history.back()}>Back</button> */}
                <div className="product_btn">
                  <button className="buy" onClick={handleBuyToProduct}>
                    Buy Now
                  </button>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(id, number)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="Other__text">
              <h3>
                Delivery information & Service Information insert in here!{" "}
              </h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
                tenetur cupiditate sunt rerum veritatis earum repellendus
                libero. Asperiores necessitatibus similique cumque alias aliquid
                nobis at esse quidem debitis consequatur accusamus corporis quo
                culpa laudantium placeat distinctio tempora, soluta repellendus
                unde mollitia. Animi aspernatur pariatur nostrum consequuntur
                fugit ducimus nulla officiis culpa aut. Reiciendis ab tempora
                iure voluptas vitae praesentium nulla nostrum perferendis
                dolore, earum qui facere voluptate ullam ipsa hic nobis dicta
                dolores fuga ducimus porro non cum! Impedit voluptas tempore
                natus accusamus deleniti animi ipsa odit, placeat, ipsam magnam
                veniam, saepe consequatur. Eaque est vitae fuga! Aliquid,
                voluptate facere!{" "}
              </p>
            </div>
          </div>
        </div>

        {/* description  */}
        <div className="description-review">
          <div className="row">
            <div className="col-8">
              <div className="description">
                <h3>Description</h3>
                <p>{description}</p>
              </div>
              <div className="review">
                <h3>Ratings & Reviews</h3>
                <ul>
                  {reviews.map((review, index) => {
                    const {
                      comment,
                      date,
                      rating,
                      reviewerEmail,
                      reviewerName,
                    } = review;
                    const formattedDate = formatDate(date);
                    return (
                      <li key={index} className="review__profile">
                        <p>
                          <strong>Name:</strong> {reviewerName}
                        </p>
                        <p>
                          <strong>Comment:</strong> {comment}
                        </p>
                        <p>
                          <strong>Rating</strong>: {rating}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          <a href={`mailto:${reviewerEmail}`} className="mail">
                            {reviewerEmail}
                          </a>
                        </p>
                        <p>
                          <strong>Date:</strong> {formattedDate}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="col-4">
              <h3>Related Other Page insert in here! </h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempore non maxime placeat doloremque numquam reiciendis labore
                id modi est incidunt! Sit nisi tempora, impedit veniam est
                cupiditate magni nam officia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShow;
