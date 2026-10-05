import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaStore, FaUserCheck } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path from location state or search param
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get("redirect");
  const from = location.state?.from?.pathname || (redirectParam ? `/${redirectParam}` : "/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  // Quick fill demo user credentials
  const fillDemoUser = () => {
    setEmail("raju@example.com");
    setPassword("raju123");
  };

  // Quick fill demo admin credentials
  const fillDemoAdmin = () => {
    setEmail("admin@rajumart.com");
    setPassword("admin123");
  };

  return (
    <div className="login-page py-5">
      <div className="container" style={{ maxWidth: "480px" }}>
        <div className="card shadow border-0 rounded-4 p-4 p-md-5 bg-white">
          {/* Logo Header */}
          <div className="text-center mb-4">
            <div className="bg-warning text-dark p-3 rounded-circle d-inline-flex mb-2">
              <FaStore size={26} />
            </div>
            <h3 className="fw-black text-dark mb-1">Welcome Back</h3>
            <p className="text-muted small">Sign in to your RAJU MART account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger py-2 small rounded-3 mb-3" role="alert">
              {error}
            </div>
          )}

          {/* Quick Demo Fill Buttons */}
          <div className="d-flex gap-2 mb-4">
            <button
              type="button"
              onClick={fillDemoUser}
              className="btn btn-outline-primary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 py-2 rounded-3 fw-semibold"
            >
              <FaUserCheck /> Demo Customer
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="btn btn-outline-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 py-2 rounded-3 fw-semibold"
            >
              <FaUserCheck /> Demo Admin
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaEnvelope size={14} />
                </span>
                <input
                  type="email"
                  className="form-control border-start-0"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label small fw-bold text-muted">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please use the Demo account credentials or create a new account.");
                  }}
                  className="text-decoration-none small text-primary"
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaLock size={14} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-start-0 border-end-0"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-light border border-start-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberCheck"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label small text-muted" htmlFor="rememberCheck">
                Remember me on this browser
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-100 fw-bold py-2 rounded-pill shadow-sm mb-3"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center pt-3 border-top mt-2">
            <span className="text-muted small">New to RAJU MART? </span>
            <Link to="/register" className="fw-bold text-primary text-decoration-none small">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
