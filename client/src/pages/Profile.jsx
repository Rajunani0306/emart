import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaShieldAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const updatePayload = {
      name: formData.name,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    if (formData.password) {
      if (formData.password.length < 6) {
        setStatusMessage({ type: "danger", text: "New password must be at least 6 characters" });
        return;
      }
      updatePayload.password = formData.password;
    }

    const res = await updateProfile(updatePayload);
    if (res.success) {
      setStatusMessage({ type: "success", text: "Profile updated successfully!" });
      setFormData((prev) => ({ ...prev, password: "" }));
    } else {
      setStatusMessage({ type: "danger", text: res.error || "Update failed." });
    }
  };

  return (
    <div className="profile-page py-4">
      <div className="container" style={{ maxWidth: "780px" }}>
        <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 border-bottom mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary text-white p-3 rounded-circle">
                <FaUserCircle size={40} />
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-0">{user?.name}</h4>
                <span className="text-muted small">{user?.email}</span>
                <span className="badge bg-secondary-subtle text-secondary ms-2 small">
                  {user?.role === "admin" ? "Administrator" : "Verified Customer"}
                </span>
              </div>
            </div>

            <div className="mt-3 mt-sm-0 d-flex gap-2">
              <Link to="/orders" className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center gap-1">
                <FaClipboardList size={13} /> My Orders
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="btn btn-warning btn-sm rounded-pill fw-bold text-dark d-flex align-items-center gap-1">
                  <FaShieldAlt size={13} /> Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Feedback Alert */}
          {statusMessage && (
            <div className={`alert alert-${statusMessage.type} py-2 small rounded-3 mb-4`}>
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h5 className="fw-bold text-dark mb-3">Personal Information</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Email (Read-only)</label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <FaEnvelope size={13} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control bg-light text-muted"
                    value={formData.email}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <FaPhone size={13} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">
                  Change Password (leave empty to keep current)
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="New password (optional)"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <FaMapMarkerAlt className="text-danger" /> Saved Delivery Address
            </h5>

            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Street / House / Colony</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  placeholder="Flat No, Apartment, Street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold text-muted">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold text-muted">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold text-muted">PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
              >
                <FaSave size={14} />
                <span>{loading ? "Saving Changes..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
