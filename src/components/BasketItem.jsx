// src/components/BasketItem.jsx
import React from "react";

function BasketItem({ name, price, quantity, image, onIncrease, onDecrease }) {
  const itemTotal = price * quantity;

  return (
    <div className="basket_item">
      <div
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          gap: "12px",
          padding: "5px 12px",
          width: "100%",
        }}
      >
        <img src={image} className="foodItem_image" alt={name} />

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <p className="foodItem_text">{name}</p>
            <p style={{ fontSize: "20px", fontWeight: 600 }}>
              £{itemTotal.toFixed(2)}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <p
              className="basket_minus"
              onClick={() => onDecrease(name)}
              style={{
                fontSize: "32px",
                cursor: "pointer",
                color: "white",
                background: "red",
                alignSelf: "center",
                borderRadius: "50%",
                padding: "0px 15px 4px 15px",
                userSelect: "none",
              }}
            >
              -
            </p>

            <p style={{ fontSize: "24px", fontWeight: 600 }}>x{quantity}</p>

            <p
              className="basket_plus"
              onClick={() => onIncrease(name)}
              style={{
                fontSize: "32px",
                cursor: "pointer",
                color: "white",
                marginRight: "24px",
                background: "green",
                alignSelf: "center",
                borderRadius: "50%",
                padding: "0px 12px 4px 12px",
                userSelect: "none",
              }}
            >
              +
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
