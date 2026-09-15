import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../../data/product";
import "./productdetails.css";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const addProduct = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="details-page">

      <div className="details-image">
        <img
          src={product.image}
          alt={product.title}
        />

        <div className="detail-buttons">
          <button onClick={addProduct}>
            🛒 ADD TO CART
          </button>

          <button
            onClick={() => {
              addProduct();
              navigate("/cart");
            }}
          >
            BUY NOW
          </button>
        </div>
      </div>

      <div className="details-info">

        <h1>{product.title}</h1>

        <div className="detail-rating">
          ⭐ {product.rating} ★
          <span>
            {product.reviews} Reviews
          </span>
        </div>

        <h2>
          ₹{product.price.toLocaleString()}
        </h2>

        <p className="old-detail-price">
          ₹{product.oldPrice.toLocaleString()}
        </p>

        <p className="detail-discount">
          {product.discount}% off
        </p>

        <h3>Quantity</h3>

        <div className="quantity">
          <button
            onClick={() =>
              setQuantity(
                Math.max(1, quantity - 1)
              )
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>
        </div>

        <h3>Description</h3>

        <p className="description">
          {product.description}
        </p>

        <h3>Brand</h3>
        <p>{product.brand}</p>

        <h3>Category</h3>
        <p>{product.category}</p>

      </div>

    </div>
  );
}

export default ProductDetail;