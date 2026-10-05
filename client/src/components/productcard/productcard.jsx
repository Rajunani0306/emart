import React from "react";

import "./productcard.css";

function ProductCard({ product, addToCart }) {

  if (!product) {
    return null;
  }

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      {/* PRODUCT NAME */}
      <h3>
        {product.title}
      </h3>

      {/* CATEGORY */}
      <p className="category">
        {product.category}
      </p>

      {/* RATING */}
      <p className="rating">
        ⭐ {product.rating}
      </p>

      {/* PRICE */}
      <p className="price">
        ₹{Number(product.price).toLocaleString("en-IN")}
      </p>

      {/* ADD TO CART */}
      <button
        className="add-cart-button"
        onClick={() => addToCart(product)}
      >
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;