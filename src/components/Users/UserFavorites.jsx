/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./UserFavorites.css";
import PageTitleSetUp from './../PageTitleSetUp';

const UserFavorites = () => {
    // Scroll to top of the page on page load
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const orderProduct = JSON.parse(localStorage.getItem("myOrder"));
  let hasFavorites = false; // Flag to check if there are any favorite items
 

  return (
    <><PageTitleSetUp title='User Favorites Page' /><main className="container">
      <div className="favorites-product">
        <div className="favorites-container">
          {orderProduct ? (
            orderProduct.map((item) => {
              const { setOrderConfirmed } = item;
              return setOrderConfirmed.map((item) => {
                const { id, isFavorite, price, thumbnail, title } = item;
                if (isFavorite === true) {
                  hasFavorites = true; // Set the flag to true if a favorite item is found
                  return (
                    <div className="favorite" key={id}>
                      <div
                        className={`favorite-img ${isFavorite ? "favorite-active" : ""}`}
                      >
                        <img src={thumbnail} alt={title} />
                      </div>
                      <div className="favorite-info">
                        <h3>{title}</h3>
                        <p>Price: ${price}</p>
                      </div>
                      <div className="favorite-btn">
                        <button onClick={() => setOrderConfirmed(false)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                }
                return null; // Return null if the item is not a favorite
              });
            })
          ) : (
            <div className="empty-favorite">
              <h3>No favorite items found</h3>
              <p>
                Add favorite items by checking the &quot;Favorite&quot; checkbox
                in the product details page.
              </p>
              <p>Once you have added some favorites, you can see them here.</p>
              <p>
                <a href="/products">Go to Shopping Page</a>
              </p>
            </div>
          )}

        </div>
      </div>
    </main></>
  );
};

export default UserFavorites;
