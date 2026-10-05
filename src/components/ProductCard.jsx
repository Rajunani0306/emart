import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaBolt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate("/checkout");
  };

  const displayImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30";

  const originalPrice =
    product.originalPrice || Math.round(product.price * 1.25);
  const discount =
    product.discount ||
    Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const inStock = product.stock > 0;

  return (
    <div className="card h-100 product-card shadow-sm border-0 position-relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm rounded-pill fw-semibold">
          {discount}% OFF
        </span>
      )}

      {/* Product Image Link */}
      <Link
        to={`/product/${product._id || product.id}`}
        className="product-card-img-wrapper d-flex align-items-center justify-content-center p-3 text-decoration-none"
      >
        <img
          src={displayImage}
          alt={product.name || product.title}
          className="img-fluid product-card-img"
          loading="lazy"
        />
      </Link>

      <div className="card-body d-flex flex-column p-3">
        {/* Brand & Stock Pill */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-muted small text-uppercase fw-bold letter-spacing-1">
            {product.brand}
          </span>
          {inStock ? (
            <span className="badge bg-success-subtle text-success d-flex align-items-center gap-1 font-xs">
              <FaCheckCircle size={10} /> In Stock
            </span>
          ) : (
            <span className="badge bg-danger-subtle text-danger d-flex align-items-center gap-1 font-xs">
              <FaExclamationCircle size={10} /> Out of Stock
            </span>
          )}
        </div>

        {/* Title */}
        <h6 className="card-title product-title mb-2">
          <Link
            to={`/product/${product._id || product.id}`}
            className="text-dark text-decoration-none"
            title={product.name || product.title}
          >
            {product.name || product.title}
          </Link>
        </h6>

        {/* Rating */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="badge bg-success text-white d-inline-flex align-items-center gap-1 px-2 py-1 rounded">
            {product.rating ? Number(product.rating).toFixed(1) : "4.5"}{" "}
            <FaStar size={11} />
          </span>
          <span className="text-muted small">
            ({(product.numReviews || 24).toLocaleString()})
          </span>
        </div>

        {/* Price Row */}
        <div className="mt-auto pt-2">
          <div className="d-flex align-items-baseline gap-2 mb-3">
            <span className="fs-5 fw-bold text-dark">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
            {originalPrice > product.price && (
              <span className="text-muted text-decoration-line-through small">
                ₹{Number(originalPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="btn btn-warning flex-fill d-flex align-items-center justify-content-center gap-1 py-2 fw-semibold btn-sm shadow-sm"
              title="Add to shopping cart"
            >
              <FaShoppingCart size={13} />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-1 py-2 fw-semibold btn-sm shadow-sm"
              style={{ backgroundColor: "#fb641b", borderColor: "#fb641b" }}
              title="Buy now immediately"
            >
              <FaBolt size={13} />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
