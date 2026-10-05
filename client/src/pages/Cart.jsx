import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShieldAlt,
  FaShoppingBag,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    itemsPrice,
    originalItemsPrice,
    discountPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="card shadow-sm border-0 rounded-4 p-5 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="empty-cart-icon mb-4 text-warning">
            <FaShoppingBag size={80} />
          </div>
          <h3 className="fw-bold text-dark mb-2">Your Shopping Cart is Empty</h3>
          <p className="text-muted mb-4">
            Looks like you haven't added anything to your cart yet. Explore thousands of great products now!
          </p>
          <Link to="/products" className="btn btn-primary fw-bold px-4 py-2 rounded-pill mx-auto">
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-4">
      <div className="container-fluid px-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-dark mb-0">
            Shopping Cart <span className="text-muted fs-6">({cartCount} items)</span>
          </h4>
          <button
            onClick={clearCart}
            className="btn btn-outline-danger btn-sm rounded-pill fw-semibold"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="row g-4">
          {/* LEFT: Cart Items List */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-3 p-3 mb-3 bg-white">
              {cartItems.map((item, index) => {
                const prodId = item.product || item._id;
                const origPrice = item.originalPrice || Math.round(item.price * 1.25);
                const discount = Math.round(((origPrice - item.price) / origPrice) * 100);

                return (
                  <div
                    key={prodId || index}
                    className={`d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 py-3 ${
                      index !== cartItems.length - 1 ? "border-bottom" : ""
                    }`}
                  >
                    {/* Image & Title */}
                    <div className="d-flex align-items-center gap-3">
                      <Link to={`/product/${prodId}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-3 border object-fit-contain p-1"
                          style={{ width: "90px", height: "90px" }}
                        />
                      </Link>

                      <div>
                        {item.brand && (
                          <span className="text-muted font-xs text-uppercase fw-bold letter-spacing-1 d-block mb-1">
                            {item.brand}
                          </span>
                        )}
                        <h6 className="fw-bold mb-1">
                          <Link
                            to={`/product/${prodId}`}
                            className="text-dark text-decoration-none"
                          >
                            {item.name}
                          </Link>
                        </h6>
                        <div className="d-flex align-items-baseline gap-2 mb-2">
                          <span className="fw-bold text-dark fs-5">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </span>
                          {origPrice > item.price && (
                            <span className="text-muted text-decoration-line-through small">
                              ₹{Number(origPrice).toLocaleString("en-IN")}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="text-success small fw-semibold">
                              {discount}% Off
                            </span>
                          )}
                        </div>

                        {/* In Stock / Delivery badge */}
                        <span className="text-success small fw-semibold d-flex align-items-center gap-1 font-xs">
                          <FaCheckCircle size={11} /> Eligible for Free Delivery
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector & Remove Action */}
                    <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3 mt-2 mt-sm-0">
                      {/* Qty Box */}
                      <div className="input-group input-group-sm" style={{ width: "110px" }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(prodId, item.quantity - 1)}
                        >
                          <FaMinus size={10} />
                        </button>
                        <input
                          type="text"
                          className="form-control text-center fw-bold bg-white"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(prodId, item.quantity + 1)}
                          disabled={item.quantity >= (item.stock || 20)}
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-end d-none d-md-block" style={{ minWidth: "90px" }}>
                        <span className="fw-bold text-dark">
                          ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(prodId)}
                        className="btn btn-light text-danger btn-sm rounded-circle p-2"
                        title="Remove item"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back to Shopping Link */}
            <Link
              to="/products"
              className="btn btn-link text-decoration-none fw-semibold d-inline-flex align-items-center gap-2 p-0 text-primary"
            >
              <FaArrowLeft size={13} /> Continue Shopping
            </Link>
          </div>

          {/* RIGHT: Price Details Summary Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-3 p-4 sticky-top bg-white" style={{ top: "90px" }}>
              <h5 className="fw-bold text-dark border-bottom pb-3 mb-3 text-uppercase font-sm letter-spacing-1">
                Price Details
              </h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Price ({cartCount} items)</span>
                <span className="fw-semibold text-dark">
                  ₹{Number(originalItemsPrice).toLocaleString("en-IN")}
                </span>
              </div>

              {discountPrice > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount</span>
                  <span className="fw-semibold">
                    - ₹{Number(discountPrice).toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Delivery Charges</span>
                <span className="fw-semibold">
                  {shippingPrice === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${shippingPrice}`
                  )}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Estimated GST (18%)</span>
                <span className="fw-semibold text-dark">
                  ₹{Number(taxPrice).toLocaleString("en-IN")}
                </span>
              </div>

              <hr className="my-2" />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-5 fw-bold text-dark">Total Amount</span>
                <span className="fs-4 fw-black text-primary">
                  ₹{Number(totalPrice).toLocaleString("en-IN")}
                </span>
              </div>

              {discountPrice > 0 && (
                <div className="alert alert-success py-2 px-3 small rounded-3 mb-4 fw-semibold text-center">
                  🎉 You will save ₹{Number(discountPrice).toLocaleString("en-IN")} on this order!
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="btn btn-warning btn-lg w-100 fw-bold py-3 rounded-pill shadow-sm"
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="mt-4 pt-3 border-top text-center text-muted small d-flex align-items-center justify-content-center gap-2">
                <FaShieldAlt className="text-success" />
                <span>Safe and Secure Payments. Easy returns.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
