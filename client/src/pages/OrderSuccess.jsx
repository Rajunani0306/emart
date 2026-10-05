import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaReceipt,
  FaArrowRight,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../services/api";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.warn("Failed to fetch order details for success screen:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullPage message="Confirming your order..." />;
  }

  // Calculate estimated delivery: 3 days from created date
  const orderDate = order?.createdAt ? new Date(order.createdAt) : new Date();
  const estimatedDate = new Date(orderDate);
  estimatedDate.setDate(orderDate.getDate() + 3);

  return (
    <div className="order-success-page py-5">
      <div className="container" style={{ maxWidth: "760px" }}>
        <div className="card shadow border-0 rounded-4 p-4 p-md-5 text-center bg-white">
          {/* Animated Success Icon */}
          <div className="mb-3 text-success">
            <FaCheckCircle size={75} />
          </div>

          <h2 className="fw-black text-dark mb-1">Order Placed Successfully!</h2>
          <p className="text-muted mb-4">
            Thank you for shopping at <strong>RAJU MART</strong>. We've received your order and are getting it ready for delivery!
          </p>

          {/* Quick Highlight Cards */}
          <div className="row g-3 text-start mb-4">
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded-3 h-100 border">
                <span className="text-muted small d-flex align-items-center gap-1 mb-1">
                  <FaReceipt className="text-primary" /> Order Reference
                </span>
                <strong className="text-dark d-block text-break">
                  #{order?._id || id}
                </strong>
                <span className="text-secondary font-xs">
                  Payment Status:{" "}
                  <span className="badge bg-success-subtle text-success">
                    {order?.paymentStatus || "Completed"}
                  </span>
                </span>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-3 bg-light rounded-3 h-100 border">
                <span className="text-muted small d-flex align-items-center gap-1 mb-1">
                  <FaCalendarAlt className="text-danger" /> Estimated Delivery
                </span>
                <strong className="text-dark d-block">
                  {estimatedDate.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </strong>
                <span className="text-success small fw-semibold font-xs">
                  Express Delivery via BlueDart
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Amount */}
          {order && (
            <div className="p-3 bg-light rounded-3 text-start mb-4 border">
              <div className="row g-3">
                <div className="col-md-7">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-1 mb-2">
                    <FaMapMarkerAlt className="text-danger" /> Delivery Address:
                  </h6>
                  <p className="mb-0 small text-dark">
                    <strong>{order.shippingAddress?.fullName}</strong> ({order.shippingAddress?.phone})
                  </p>
                  <p className="mb-0 small text-secondary">
                    {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                  </p>
                </div>

                <div className="col-md-5 border-start-md text-md-end">
                  <h6 className="fw-bold text-dark mb-1">Total Paid:</h6>
                  <h4 className="fw-black text-primary mb-0">
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </h4>
                  <span className="text-muted font-xs">
                    Via {order.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay Online"}
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              {order.orderItems && order.orderItems.length > 0 && (
                <div className="mt-3 pt-3 border-top">
                  <h6 className="fw-bold text-dark small mb-2">Ordered Items:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="d-flex align-items-center gap-2 p-2 bg-white rounded border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "32px", height: "32px", objectFit: "contain" }}
                        />
                        <span className="small text-truncate" style={{ maxWidth: "160px" }}>
                          {item.name}
                        </span>
                        <span className="badge bg-secondary">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link
              to="/orders"
              className="btn btn-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
            >
              <span>View My Orders</span>
              <FaArrowRight size={13} />
            </Link>
            <Link
              to="/products"
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
            >
              <FaShoppingBag size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
