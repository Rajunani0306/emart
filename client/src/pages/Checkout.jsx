import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaShieldAlt,
  FaLock,
  FaTruck,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    cartCount,
    itemsPrice,
    originalItemsPrice,
    discountPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    clearCart,
  } = useCart();

  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Simulated Test Modal for Razorpay Sandbox (when Razorpay popup is completed or mocked)
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [sandboxOrderInfo, setSandboxOrderInfo] = useState(null);

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const validateAddress = () => {
    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      setError("Please complete all delivery address fields.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // 1. Create Order in MongoDB
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        discountPrice,
        totalAmount: totalPrice,
      };

      const { data: createdOrder } = await API.post("/orders", orderPayload);

      // 2. Handle Payment Method
      if (paymentMethod === "COD") {
        // Cash on delivery: Order is immediately confirmed
        await clearCart();
        navigate(`/order-success/${createdOrder._id}`);
      } else {
        // Online Payment via Razorpay
        const { data: paymentOrder } = await API.post("/payment/create-order", {
          orderId: createdOrder._id,
          amount: totalPrice,
        });

        // Check if Razorpay checkout script is loaded in browser
        if (window.Razorpay && !paymentOrder.isSandboxMock) {
          const options = {
            key: paymentOrder.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: paymentOrder.amount,
            currency: paymentOrder.currency || "INR",
            name: "RAJU MART",
            description: `Payment for Order #${createdOrder._id}`,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
            order_id: paymentOrder.id,
            prefill: {
              name: shippingAddress.fullName,
              email: user?.email,
              contact: shippingAddress.phone,
            },
            theme: {
              color: "#2874f0",
            },
            handler: async function (response) {
              try {
                // Verify payment on backend
                const verifyRes = await API.post("/payment/verify", {
                  orderId: createdOrder._id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                });

                if (verifyRes.data.success) {
                  await clearCart();
                  navigate(`/order-success/${createdOrder._id}`);
                } else {
                  setError("Payment verification failed. Please try again.");
                }
              } catch (err) {
                setError(err.response?.data?.message || "Payment verification failed");
              }
            },
            modal: {
              ondismiss: function () {
                setProcessing(false);
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          // Open instant test sandbox modal for seamless immediate evaluation
          setSandboxOrderInfo({
            createdOrder,
            paymentOrder,
          });
          setShowSandboxModal(true);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process order. Please try again.");
      setProcessing(false);
    }
  };

  // Complete Sandbox Payment
  const completeSandboxPayment = async () => {
    if (!sandboxOrderInfo) return;
    setProcessing(true);
    try {
      const { createdOrder, paymentOrder } = sandboxOrderInfo;
      const verifyRes = await API.post("/payment/verify", {
        orderId: createdOrder._id,
        razorpayOrderId: paymentOrder.id || `order_test_${Date.now()}`,
        razorpayPaymentId: `pay_test_${Date.now()}`,
        razorpaySignature: "sandbox_verified_signature",
        isSandboxMock: true,
      });

      if (verifyRes.data.success) {
        setShowSandboxModal(false);
        await clearCart();
        navigate(`/order-success/${createdOrder._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sandbox payment verification failed");
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No items to checkout</h4>
        <Link to="/products" className="btn btn-primary mt-3">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page py-4">
      <div className="container-fluid px-lg-5">
        <div className="d-flex align-items-center gap-2 mb-4">
          <Link to="/cart" className="text-decoration-none text-muted">
            <FaArrowLeft />
          </Link>
          <h4 className="fw-bold text-dark mb-0">Checkout & Payment</h4>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show rounded-3" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="row g-4">
            {/* LEFT COLUMN: Shipping Address & Payment Selection */}
            <div className="col-lg-7">
              {/* 1. DELIVERY ADDRESS */}
              <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2 border-bottom pb-2">
                  <FaTruck className="text-primary" /> 1. Delivery Address
                </h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      className="form-control"
                      placeholder="Flat, House no., Building, Apartment, Street"
                      value={shippingAddress.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold text-muted">City *</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold text-muted">State *</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold text-muted">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      value={shippingAddress.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. PAYMENT METHOD */}
              <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2 border-bottom pb-2">
                  <FaLock className="text-success" /> 2. Payment Method
                </h5>

                <div className="d-flex flex-column gap-3">
                  {/* Razorpay Online */}
                  <label
                    className={`d-flex align-items-center justify-content-between p-3 border rounded-3 cursor-pointer transition-all ${
                      paymentMethod === "Razorpay" ? "border-primary bg-primary-subtle" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Razorpay"
                        checked={paymentMethod === "Razorpay"}
                        onChange={() => setPaymentMethod("Razorpay")}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <span className="fw-bold text-dark d-block">
                          Razorpay / Online Payment (UPI, Cards, NetBanking, Wallets)
                        </span>
                        <span className="text-muted small">
                          Safe & instant checkout via test/sandbox mode
                        </span>
                      </div>
                    </div>
                    <FaCreditCard size={22} className="text-primary flex-shrink-0" />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`d-flex align-items-center justify-content-between p-3 border rounded-3 cursor-pointer transition-all ${
                      paymentMethod === "COD" ? "border-primary bg-primary-subtle" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <span className="fw-bold text-dark d-block">Cash on Delivery (COD)</span>
                        <span className="text-muted small">Pay with cash when package arrives</span>
                      </div>
                    </div>
                    <FaMoneyBillWave size={22} className="text-success flex-shrink-0" />
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order */}
            <div className="col-lg-5">
              <div className="card shadow-sm border-0 rounded-3 p-4 sticky-top bg-white" style={{ top: "90px" }}>
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Order Summary</h5>

                {/* Items Preview */}
                <div className="cart-items-preview mb-3 overflow-auto" style={{ maxHeight: "220px" }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.product}
                      className="d-flex align-items-center justify-content-between py-2 border-bottom"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded object-fit-contain border p-1"
                          style={{ width: "42px", height: "42px" }}
                        />
                        <div style={{ maxWidth: "180px" }}>
                          <span className="small fw-semibold text-truncate d-block">
                            {item.name}
                          </span>
                          <span className="text-muted font-xs">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="fw-bold small text-dark">
                        ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="d-flex justify-content-between mb-2 small text-secondary">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="fw-semibold text-dark">
                    ₹{Number(itemsPrice).toLocaleString("en-IN")}
                  </span>
                </div>

                {discountPrice > 0 && (
                  <div className="d-flex justify-content-between mb-2 small text-success">
                    <span>Discount</span>
                    <span className="fw-semibold">
                      - ₹{Number(discountPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2 small text-secondary">
                  <span>Delivery Charges</span>
                  <span className="fw-semibold">
                    {shippingPrice === 0 ? <span className="text-success">FREE</span> : `₹${shippingPrice}`}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3 small text-secondary">
                  <span>Estimated Tax (18% GST)</span>
                  <span className="fw-semibold text-dark">
                    ₹{Number(taxPrice).toLocaleString("en-IN")}
                  </span>
                </div>

                <hr className="my-2" />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold text-dark">Grand Total</span>
                  <span className="fs-4 fw-black text-primary">
                    ₹{Number(totalPrice).toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-warning btn-lg w-100 fw-bold py-3 rounded-pill shadow-sm"
                >
                  {processing ? (
                    "Processing..."
                  ) : paymentMethod === "Razorpay" ? (
                    `PAY ₹${Number(totalPrice).toLocaleString("en-IN")} NOW`
                  ) : (
                    "PLACE CASH ON DELIVERY ORDER"
                  )}
                </button>

                <div className="mt-3 text-center text-muted font-xs d-flex align-items-center justify-content-center gap-1">
                  <FaShieldAlt className="text-success" />
                  <span>256-Bit SSL Encrypted & Verified Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* RAZORPAY TEST SANDBOX SIMULATION MODAL */}
      {showSandboxModal && sandboxOrderInfo && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div
                className="modal-header text-white p-3"
                style={{ backgroundColor: "#2874f0" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <FaCreditCard size={20} />
                  <h5 className="modal-title fw-bold mb-0">Razorpay Test Gateway (Sandbox)</h5>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowSandboxModal(false);
                    setProcessing(false);
                  }}
                ></button>
              </div>

              <div className="modal-body p-4 text-center">
                <div className="mb-3">
                  <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold">
                    TEST MODE ACTIVE
                  </span>
                </div>

                <h4 className="fw-bold mb-1">
                  Pay ₹{Number(totalPrice).toLocaleString("en-IN")}
                </h4>
                <p className="text-muted small mb-3">
                  Razorpay Order ID: <code>{sandboxOrderInfo.paymentOrder?.id}</code>
                </p>

                <div className="p-3 bg-light rounded-3 text-start small mb-4">
                  <p className="mb-1 text-dark">
                    <strong>Customer:</strong> {shippingAddress.fullName} ({user?.email})
                  </p>
                  <p className="mb-1 text-dark">
                    <strong>Contact:</strong> {shippingAddress.phone}
                  </p>
                  <p className="mb-0 text-dark">
                    <strong>Test Card:</strong> 4111 •••• •••• 1111 (Authorized)
                  </p>
                </div>

                <p className="text-secondary small mb-4">
                  Click the button below to authorize this test transaction and confirm your order in MongoDB.
                </p>

                <button
                  onClick={completeSandboxPayment}
                  disabled={processing}
                  className="btn btn-success btn-lg w-100 fw-bold rounded-pill shadow"
                >
                  {processing ? "Authorizing Payment..." : "✓ Complete Test Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
