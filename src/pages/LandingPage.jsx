import React, { useEffect } from "react";
import "../pages/LandingPage.css";
import BinIcon from "../../public/images/BinIcon.svg";

function LandingPage() {
  
  useEffect(() => {
    const searchInput = document.querySelector("#searchInput");
    const foodItems = document.querySelectorAll(".foodItem");

    const basketItems = document.querySelector(".basket_items");
    const emptyBasket = document.querySelector(".empty_basket");
    const binIcon = document.querySelector("#binIcon");

    const basket = {};

    // Search functionality
    searchInput.addEventListener("input", function () {
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
    });

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

    // Add items to basket
    foodItems.forEach(function (foodItem) {
      const plusButton = foodItem.querySelector(".plus_icon");

      plusButton.addEventListener("click", function () {
        const name = foodItem.querySelector(".foodItem_text").textContent;
        const price = foodItem.querySelector(".price_text").textContent;
        const image = foodItem.querySelector("img").src;

        binIcon.innerHTML = `
          <img 
            src="/images/BinIcon.svg" 
            style=" cursor: pointer;"
            alt="Clear basket"
          />
  `;
        if (basket[name]) {
          basket[name].quantity++;
        } else {
          basket[name] = {
            price: price,
            image: image,
            quantity: 1,
          };
        }

        updateBasket();
      });
    });

    // Update basket
    function updateBasket() {
      // Remove old basket items
      basketItems.querySelectorAll(".basket_item").forEach(function (item) {
        item.remove();
      });

      // Remove old total
      const oldTotal = basketItems.querySelector(".basket_total");

      if (oldTotal) {
        oldTotal.remove();
      }

      const basketNames = Object.keys(basket);

      // Basket is empty
      if (basketNames.length === 0) {
        emptyBasket.style.display = "flex";
        return;
      }

      // Basket has items
      emptyBasket.style.display = "none";

      let totalItems = 0;
      let totalPrice = 0;

      // Create basket items
      for (const name in basket) {
        const basketItem = document.createElement("div");

        basketItem.classList.add("basket_item");

        const price = parseFloat(basket[name].price.replace("£", ""));
        const quantity = basket[name].quantity;
        const itemTotal = price * quantity;

        // Add to totals
        totalItems += quantity;
        totalPrice += itemTotal;

        basketItem.innerHTML = `
      <div 
        style="
          border-bottom: 1px solid black; 
          display: flex; 
          gap: 12px; 
          padding: 5px 12px;
          width: 100%;
        "
      >
        <img src="${basket[name].image}" class="foodItem_image" />

        <div 
          style="
            width: 100%; 
            display: flex; 
            align-items: center; 
            justify-content: space-between;
          "
        >
          <div style="display: flex; flex-direction: column; gap: 5px">
            <p class="foodItem_text">${name}</p>

            <p style="font-size: 20px; font-weight: 600;">
              £${itemTotal.toFixed(2)}
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 6px">
            <p 
              class="basket_minus"
              data-name="${name}"
              style="font-size: 32px; cursor: pointer; color: white; background: red; align-self: center; border-radius: 50%; padding: 0px 15px 4px 15px"
            >
              -
            </p>

               <p style="font-size: 24px; font-weight: 600">
              x${quantity}
            </p>

               <p 
              class="basket_plus"
              data-name="${name}"
              style="font-size: 32px; cursor: pointer; color: white; margin-right: 24px; background: green; align-self: center; border-radius: 50%; padding: 0px 12px 4px 12px"
            >
              +
            </p>
          </div>
        </div>
      </div>
    `;

        basketItems.appendChild(basketItem);
      }

      binIcon.addEventListener("click", function () {
        for (const name in basket) {
          delete basket[name];
        }

        binIcon.innerHTML = "";

        updateBasket();
      });

      // Create ONE total section
      const basketTotal = document.createElement("div");

      basketTotal.classList.add("basket_total");

      basketTotal.innerHTML = `
    <div>
      <p>Total items</p>
      <p>Total price</p>
    </div>

    <div style="text-align: right">
      <p>${totalItems}</p>
      <p>£${totalPrice.toFixed(2)}</p>
    </div>
  `;

      basketItems.appendChild(basketTotal);
    }

    // Plus and minus buttons inside basket
    basketItems.addEventListener("click", function (event) {
      // Plus button
      if (event.target.classList.contains("basket_plus")) {
        const name = event.target.dataset.name;

        basket[name].quantity++;

        updateBasket();
      }

      // Minus button
      if (event.target.classList.contains("basket_minus")) {
        const name = event.target.dataset.name;

        basket[name].quantity--;

        // Delete item when quantity reaches 0
        if (basket[name].quantity === 0) {
          delete basket[name];
        }

        if (Object.keys(basket).length === 0) {
          binIcon.innerHTML = "";
        }

        updateBasket();
      }
    });
  }, []);

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
            <div className="foodItem" data-category="pizza">
              <img
                src="images/MargheritaPizza.jpg"
                className="foodItem_image"
                alt="Margherita Pizza"
              />
              <div className="foodItem_info">
                {/* Fixed inline style syntax to use an object */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Margherita Pizza</p>
                  <p className="foodItem_description">
                    Pizza with simple topping.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£8.00</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="pizza">
              <img
                src="images/VeggiePizza.jpg"
                className="foodItem_image"
                alt="Veggie Pizza"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Veggie Pizza</p>
                  <p className="foodItem_description">
                    Italian pizza dough topped with zucchini, mushrooms,
                    capsicum and olives.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£9.00</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="sandwiches">
              <img
                src="images/ChickenSandwich.jpeg"
                className="foodItem_image"
                alt="Chicken Sandwich"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Chicken Sandwich</p>
                  <p className="foodItem_description">
                    A sandwich filled with crispy breaded and fried chicken,
                    typically served with lettuce and mayo.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£6.00</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="sandwiches">
              <img
                src="images/BBQChickenSandwich.jpg"
                className="foodItem_image"
                alt="Grilled BBQ Sandwich"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Grilled BBQ Sandwich</p>
                  <p className="foodItem_description">
                    Grilled chicken breast, BBQ sauce, crisp lettuce, and fresh
                    tomato on a bun.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£8.00</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="pasta">
              <img
                src="images/AlfredoPasta.webp"
                className="foodItem_image"
                alt="Alfredo Pasta"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Alfredo Pasta</p>
                  <p className="foodItem_description">
                    Italian pasta in creamy white sauce topped with succulent
                    grilled chicken breast, italian parmesan cheese and
                    mushrooms.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£7.00</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="pasta">
              <img
                src="images/MacAndCheese.webp"
                className="foodItem_image"
                alt="Mac And Cheese"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Mac And Cheese</p>
                  <p className="foodItem_description">
                    Pasta dish made with macaroni and cheese sauce.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£7.25</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="desserts">
              <img
                src="images/ChocolateCake.jpeg"
                className="foodItem_image"
                alt="Chocolate Cake"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Chocolate Cake</p>
                  <p className="foodItem_description">
                    Decadent dark chocolate layers stacked with velvety fudge
                    frosting, finished with chocolate shavings.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£5.50</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>

            <div className="foodItem" data-category="drinks">
              <img
                src="images/WaterBottle.webp"
                className="foodItem_image"
                alt="Water"
              />
              <div className="foodItem_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className="foodItem_text">Water</p>
                  <p className="foodItem_description">Mineral Water.</p>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <p className="price_text">£4.00</p>
                  <p className="plus_icon">+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="basket_container">
        <div className="basket_title">
          <h1>Your Basket</h1>
          <div id="binIcon"></div>
        </div>

        <div className="basket_items">
          <div className="empty_basket">
            <img
              src="images/EmptyCart.svg"
              style={{ width: "84px", height: "84px" }}
              alt="Empty Cart"
            />
            <p>There are no items in your basket</p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default LandingPage;
