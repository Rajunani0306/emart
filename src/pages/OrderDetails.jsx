import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaHome,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaPrint,
  FaReceipt,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../services/api";

const statusSteps = ["Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.warn("Failed to fetch order details:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching tracking information..." />;
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h4>Order not found</h4>
        <Link to="/orders" className="btn btn-primary mt-3">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.orderStatus);

  return (
    <div className="order-details-page py-4">
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link
            to="/orders"
            className="text-decoration-none text-muted d-flex align-items-center gap-2 fw-semibold"
          >
            <FaArrowLeft /> Back to Orders
          </Link>
          <button
            onClick={() => window.print()}
            className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1"
          >
            <FaPrint size={13} /> Print Invoice
          </button>
        </div>

        {/* Order Reference Card */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 border-bottom mb-4">
            <div>
              <span className="text-muted small">Order ID</span>
              <h5 className="fw-bold text-dark mb-0">#{order._id}</h5>
            </div>
            <div>
              <span className="text-muted small">Placed On</span>
              <p className="fw-semibold text-dark mb-0">
                {new Date(order.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <span className="text-muted small">Order Status</span>
              <span className="badge bg-primary px-3 py-2 rounded-pill d-block">
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* VISUAL TRACKING STEPPER */}
          {order.orderStatus !== "Cancelled" ? (
            <div className="tracking-timeline my-4">
              <h6 className="fw-bold text-dark mb-4">Delivery Progress</h6>
              <div className="d-flex justify-content-between position-relative stepper-bar">
                {statusSteps.map((step, idx) => {
                  const isDone = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div
                      key={step}
                      className="d-flex flex-column align-items-center text-center flex-fill position-relative z-1"
                    >
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-2 ${
                          isDone ? "bg-success text-white" : "bg-light text-muted border"
                        }`}
                        style={{ width: "42px", height: "42px" }}
                      >
                        {isDone ? <FaCheckCircle size={18} /> : <FaBox size={14} />}
                      </div>
                      <span
                        className={`small font-xs ${
                          isCurrent
                            ? "fw-bold text-primary"
                            : isDone
                            ? "fw-semibold text-dark"
                            : "text-muted"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="alert alert-danger rounded-3 fw-semibold">
              This order was cancelled.
            </div>
          )}

          {/* Address & Payment Information */}
          <div className="row g-4 pt-3 border-top mt-2">
            <div className="col-md-6">
              <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-danger" /> Delivery Address
              </h6>
              <p className="mb-1 text-dark fw-semibold">{order.shippingAddress?.fullName}</p>
              <p className="mb-1 text-muted small">{order.shippingAddress?.street}</p>
              <p className="mb-1 text-muted small">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.pincode}
              </p>
              <p className="mb-0 text-muted small">
                <strong>Phone:</strong> {order.shippingAddress?.phone}
              </p>
            </div>

            <div className="col-md-6">
              <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                <FaReceipt className="text-primary" /> Payment Information
              </h6>
              <p className="mb-1 text-dark">
                <strong>Method:</strong>{" "}
                {order.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay Online"}
              </p>
              <p className="mb-1 text-dark">
                <strong>Payment Status:</strong>{" "}
                <span className="badge bg-success-subtle text-success">
                  {order.paymentStatus}
                </span>
              </p>
              {order.paymentResult?.id && (
                <p className="mb-0 text-muted font-xs text-break">
                  <strong>Transaction ID:</strong> {order.paymentResult.id}
                </p>
              )}
            </div>
          </div>

          {/* Ordered Products */}
          <div className="mt-4 pt-3 border-top">
            <h6 className="fw-bold text-dark mb-3">Items in this Order</h6>
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead className="bg-light text-muted small">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems?.map((item, idx) => (
                    <tr key={idx} className="border-bottom">
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "50px", height: "50px", objectFit: "contain" }}
                            className="rounded border p-1"
                          />
                          <span className="fw-semibold text-dark small">{item.name}</span>
                        </div>
                      </td>
                      <td className="small">₹{Number(item.price).toLocaleString("en-IN")}</td>
                      <td className="small">{item.quantity}</td>
                      <td className="small fw-bold text-end">
                        ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            <div className="row justify-content-end mt-3">
              <div className="col-md-5">
                <div className="d-flex justify-content-between mb-1 small text-muted">
                  <span>Items Subtotal:</span>
                  <span>₹{Number(order.itemsPrice || order.totalAmount).toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between mb-1 small text-muted">
                  <span>Shipping:</span>
                  <span>{order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Tax (GST):</span>
                  <span>₹{Number(order.taxPrice || 0).toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between pt-2 border-top fw-bold fs-5 text-dark">
                  <span>Grand Total:</span>
                  <span className="text-primary">
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
