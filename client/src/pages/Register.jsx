import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaStore } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");
  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setValidationError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match. Please verify.");
      return;
    }

    const res = await register({ name, email, phone, password });
    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="register-page py-5">
      <div className="container" style={{ maxWidth: "520px" }}>
        <div className="card shadow border-0 rounded-4 p-4 p-md-5 bg-white">
          {/* Logo Header */}
          <div className="text-center mb-4">
            <div className="bg-warning text-dark p-3 rounded-circle d-inline-flex mb-2">
              <FaStore size={26} />
            </div>
            <h3 className="fw-black text-dark mb-1">Create Account</h3>
            <p className="text-muted small">Join RAJU MART for the ultimate shopping experience</p>
          </div>

          {/* Validation & Server Error Alerts */}
          {(validationError || error) && (
            <div className="alert alert-danger py-2 small rounded-3 mb-3" role="alert">
              {validationError || error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Full Name *</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaUser size={13} />
                </span>
                <input
                  type="text"
                  name="name"
                  className="form-control border-start-0"
                  placeholder="e.g. Raju Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Email Address *</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaEnvelope size={13} />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control border-start-0"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Phone Number *</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaPhone size={13} />
                </span>
                <input
                  type="tel"
                  name="phone"
                  className="form-control border-start-0"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Password * (min 6 characters)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaLock size={13} />
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control border-start-0"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Confirm Password *</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaLock size={13} />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control border-start-0"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-warning btn-lg w-100 fw-bold py-2 rounded-pill shadow-sm mb-3 text-dark"
            >
              {loading ? "Creating Account..." : "REGISTER & CONTINUE"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-3 border-top mt-2">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="fw-bold text-primary text-decoration-none small">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
