import React, { useState, useEffect } from "react";
import "../pages/LandingPage.css";
import FoodItem from "../components/FoodItem";
import BasketItem from "../components/BasketItem";
import { foodItemsData } from "../data/foodItems";

function LandingPage() {
  const [basket, setBasket] = useState({});

  useEffect(() => {
    const searchInput = document.querySelector("#searchInput");
    const foodItems = document.querySelectorAll(".foodItem");

    // Search functionality
    const handleSearch = function () {
      const searchValue = searchInput.value.toLowerCase();

      foodItems.forEach(function (foodItem) {
        const name = foodItem
          .querySelector(".foodItem_text")
          .textContent.toLowerCase();

        const description = foodItem
          .querySelector(".foodItem_description")
          .textContent.toLowerCase();

        if (name.includes(searchValue) || description.includes(searchValue)) {
          foodItem.style.display = "";
        } else {
          foodItem.style.display = "none";
        }
      });
    };
    searchInput.addEventListener("input", handleSearch);

    const categories = document.querySelectorAll(".category");

    categories.forEach(function (category) {
      category.addEventListener("click", function () {
        const selectedCategory = category.dataset.category;

        foodItems.forEach(function (foodItem) {
          const foodCategory = foodItem.dataset.category;

          if (
            selectedCategory === "showAll" ||
            foodCategory === selectedCategory
          ) {
            foodItem.style.display = "";
          } else {
            foodItem.style.display = "none";
          }
        });
      });
    });
  }, []);

  const handleAddToCart = (item) => {
    setBasket((prevBasket) => {
      const existing = prevBasket[item.name];
      if (existing) {
        return {
          ...prevBasket,
          [item.name]: {
            ...existing,
            quantity: existing.quantity + 1,
          },
        };
      }
      return {
        ...prevBasket,
        [item.name]: {
          price: Number(item.price),
          image: item.image,
          quantity: 1,
        },
      };
    });
  };

  const handleIncrease = (name) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      [name]: {
        ...prevBasket[name],
        quantity: prevBasket[name].quantity + 1,
      },
    }));
  };

  const handleDecrease = (name) => {
    setBasket((prevBasket) => {
      const updated = { ...prevBasket };
      if (updated[name].quantity <= 1) {
        delete updated[name];
      } else {
        updated[name] = {
          ...updated[name],
          quantity: updated[name].quantity - 1,
        };
      }
      return updated;
    });
  };

  const handleClearBasket = () => {
    setBasket({});
  };

  const basketEntries = Object.entries(basket);
  const totalItems = basketEntries.reduce(
    (sum, [, item]) => sum + item.quantity,
    0,
  );
  const totalPrice = basketEntries.reduce(
    (sum, [, item]) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container">
      <div className="menu_container">
        <div className="category_card">
          <h1>Categories</h1>

          <p className="category" data-category="showAll">
            Show All
          </p>
          <p className="category" data-category="pizza">
            Pizza
          </p>
          <p className="category" data-category="sandwiches">
            Sandwiches
          </p>
          <p className="category" data-category="pasta">
            Pasta
          </p>
          <p className="category" data-category="desserts">
            Desserts
          </p>
          <p className="category" data-category="drinks">
            Drinks
          </p>
        </div>

        <div className="foodItems_container">
          <input id="searchInput" placeholder="Search menu item" />
          <div className="foodItems_list">
            {foodItemsData.map((item) => (
              <FoodItem
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="basket_container">
        <div className="basket_title">
          <h1>Your Basket</h1>
          <div id="binIcon">
            {basketEntries.length > 0 && (
              <img
                src="/images/BinIcon.svg"
                style={{ cursor: "pointer" }}
                alt="Clear basket"
                onClick={handleClearBasket}
              />
            )}
          </div>
        </div>

        <div className="basket_items">
          {basketEntries.length === 0 ? (
            <div className="empty_basket">
              <img
                src="images/EmptyCart.svg"
                style={{ width: "84px", height: "84px" }}
                alt="Empty Cart"
              />
              <p>There are no items in your basket</p>
            </div>
          ) : (
            <>
              {basketEntries.map(([name, item]) => (
                <BasketItem
                  key={name}
                  name={name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              ))}

              <div className="basket_total">
                <div>
                  <p>Total items</p>
                  <p>Total price</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p>{totalItems}</p>
                  <p>£{totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
