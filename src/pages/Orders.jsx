import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaTruck,
  FaBan,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders");
      setOrders(data || []);
    } catch (err) {
      console.warn("Failed to fetch user orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setCancellingId(orderId);
    try {
      await API.put(`/orders/${orderId}/cancel`);
      await fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success";
      case "Shipped":
      case "Out for Delivery":
        return "bg-info text-dark";
      case "Processing":
      case "Confirmed":
        return "bg-primary";
      case "Cancelled":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching your order history..." />;
  }

  return (
    <div className="orders-page py-4">
      <div className="container-fluid px-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-dark mb-0">My Orders ({orders.length})</h4>
          <Link to="/products" className="btn btn-outline-primary btn-sm rounded-pill fw-semibold">
            Explore More Products
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="card shadow-sm border-0 rounded-4 p-5 text-center my-4 bg-white">
            <div className="text-muted mb-3">
              <FaBoxOpen size={70} />
            </div>
            <h4 className="fw-bold text-dark mb-2">No Orders Found</h4>
            <p className="text-muted mb-4">
              You haven't placed any orders yet. Start shopping and find great deals!
            </p>
            <Link to="/products" className="btn btn-primary fw-bold px-4 rounded-pill mx-auto">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => {
              const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={order._id}
                  className="card shadow-sm border-0 rounded-3 p-4 bg-white order-card"
                >
                  {/* Top Bar: Order ID, Date, Status */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 border-bottom mb-3 gap-2">
                    <div>
                      <span className="small text-muted d-block">Order Placed</span>
                      <strong className="text-dark small d-flex align-items-center gap-1">
                        <FaCalendarAlt size={12} className="text-primary" /> {orderDate}
                      </strong>
                    </div>

                    <div>
                      <span className="small text-muted d-block">Total Amount</span>
                      <strong className="text-dark fs-6">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span className="small text-muted d-block">Payment</span>
                      <span className="badge bg-light text-dark border">
                        {order.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay Online"}
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <span className={`badge px-3 py-2 rounded-pill ${getStatusBadgeClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Products in this order */}
                  <div className="d-flex flex-column gap-3">
                    {order.orderItems?.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between gap-3"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded border object-fit-contain p-1"
                            style={{ width: "65px", height: "65px" }}
                          />
                          <div>
                            <h6 className="fw-semibold mb-1 text-dark text-truncate" style={{ maxWidth: "450px" }}>
                              {item.name}
                            </h6>
                            <span className="text-muted small">
                              Quantity: {item.quantity} × ₹{Number(item.price).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="text-end">
                          <span className="fw-bold text-dark">
                            ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer: Shipping Address & Details Link */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 border-top mt-3 gap-2">
                    <div className="small text-muted d-flex align-items-center gap-1">
                      <FaMapMarkerAlt className="text-danger" />
                      <span>
                        Ship to: <strong>{order.shippingAddress?.fullName}</strong>,{" "}
                        {order.shippingAddress?.city} ({order.shippingAddress?.pincode})
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {order.orderStatus !== "Delivered" && order.orderStatus !== "Cancelled" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingId === order._id}
                          className="btn btn-outline-danger btn-sm rounded-pill fw-semibold d-flex align-items-center gap-1"
                        >
                          <FaBan size={11} />
                          <span>{cancellingId === order._id ? "Cancelling..." : "Cancel Order"}</span>
                        </button>
                      )}

                      <Link
                        to={`/orders/${order._id}`}
                        className="btn btn-outline-primary btn-sm rounded-pill fw-semibold d-flex align-items-center gap-1"
                      >
                        <FaTruck size={12} />
                        <span>Track Order Details</span>
                        <FaArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
