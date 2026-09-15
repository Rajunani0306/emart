import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar({
  cartCount,
  isLoggedIn,
  setIsLoggedIn
}) {
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        <span>Flipkart</span>
        <small>Explore Plus ✨</small>
      </div>

      <div className="search-box">
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search for products, brands and more"
        />
      </div>

      {isLoggedIn ? (
        <button
          className="login-button"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <button
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

      <Link to="/orders" className="nav-link">
        Orders
      </Link>

      <Link to="/cart" className="cart-link">
        🛒 Cart
        <span>{cartCount}</span>
      </Link>

    </nav>
  );
}

export default Navbar;