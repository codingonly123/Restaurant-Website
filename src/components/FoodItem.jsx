// src/components/FoodItem.jsx
import React from "react";

function FoodItem({ name, description, price, image, category, onAddToCart }) {
  return (
    <div className="foodItem" data-category={category}>
      <img src={image} className="foodItem_image" alt={name} />
      <div className="foodItem_info">
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p className="foodItem_text">{name}</p>
          <p className="foodItem_description">{description}</p>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <p className="price_text">£{Number(price).toFixed(2)}</p>
          <p
            className="plus_icon"
            style={{ cursor: "pointer" }}
            onClick={
              onAddToCart
                ? () => onAddToCart({ name, price, image })
                : undefined
            }
          >
            +
          </p>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
