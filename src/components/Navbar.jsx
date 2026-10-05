import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaUserCog,
  FaShieldAlt,
  FaStore,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount, toastMessage } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowMobileMenu(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark main-navbar sticky-top shadow-sm py-2">
        <div className="container-fluid px-lg-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 me-lg-4 logo-container"
          >
            <div className="logo-badge bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold">
              <FaStore size={18} />
            </div>
            <div className="d-flex flex-column">
              <span className="brand-name fw-black tracking-wide text-white fs-4 lh-1">
                RAJU <span className="text-warning">MART</span>
              </span>
              <span className="brand-tagline text-light opacity-75 font-xs">
                Explore <span className="text-warning fw-semibold">Plus ✨</span>
              </span>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <form
            onSubmit={handleSearchSubmit}
            className="d-flex flex-grow-1 mx-lg-4 search-form position-relative my-2 my-lg-0"
            style={{ maxWidth: "560px" }}
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0 px-3 py-2 search-input shadow-none"
                placeholder="Search for products, brands, electronics and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <button
                className="btn btn-warning text-dark px-3 fw-bold d-flex align-items-center justify-content-center search-btn"
                type="submit"
              >
                <FaSearch size={15} />
              </button>
            </div>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggler border-0 shadow-none d-lg-none text-white ms-auto me-2"
            type="button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle navigation"
          >
            {showMobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Desktop & Collapsible Links */}
          <div
            className={`collapse navbar-collapse ${showMobileMenu ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 gap-2 py-2 py-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link text-white fw-semibold px-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link text-white fw-semibold px-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/orders"
                  className="nav-link text-white fw-semibold px-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Orders
                </Link>
              </li>

              {/* User Dropdown / Auth Buttons */}
              {isAuthenticated ? (
                <li className="nav-item dropdown position-relative">
                  <button
                    className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-3 py-1 dropdown-toggle fw-semibold user-dropdown-btn"
                    onClick={() => setShowDropdown(!showDropdown)}
                    type="button"
                  >
                    <FaUserCircle size={18} />
                    <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
                  </button>

                  {showDropdown && (
                    <div
                      className="dropdown-menu dropdown-menu-end show position-absolute shadow-lg border-0 rounded-3 mt-2 py-2"
                      style={{ minWidth: "200px", zIndex: 1050 }}
                    >
                      <div className="px-3 py-2 border-bottom">
                        <p className="fw-bold mb-0 text-dark">{user?.name}</p>
                        <p className="text-muted small mb-0">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaUserCog className="text-primary" /> My Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaClipboardList className="text-success" /> My Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="dropdown-item d-flex align-items-center gap-2 py-2 text-warning-emphasis fw-bold"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaShieldAlt className="text-danger" /> Admin Dashboard
                        </Link>
                      )}

                      <div className="dropdown-divider my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger fw-semibold"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li className="nav-item d-flex gap-2">
                  <Link
                    to="/login"
                    className="btn btn-light fw-bold text-primary rounded-pill px-3 py-1"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-warning fw-bold text-dark rounded-pill px-3 py-1 d-none d-sm-inline-block"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Register
                  </Link>
                </li>
              )}

              {/* Cart Button with Count Badge */}
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="btn btn-warning text-dark fw-bold rounded-pill px-3 py-1 d-flex align-items-center gap-2 cart-nav-btn position-relative shadow-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaShoppingCart size={17} />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="badge rounded-pill bg-danger text-white cart-badge">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1100 }}
        >
          <div className="toast show align-items-center text-white bg-dark border-0 shadow-lg rounded-3 py-1 px-2">
            <div className="d-flex">
              <div className="toast-body fw-semibold">{toastMessage}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
