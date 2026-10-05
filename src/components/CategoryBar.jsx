import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaMobileAlt,
  FaLaptop,
  FaDesktop,
  FaPlug,
  FaTv,
  FaHeadphones,
  FaClock,
  FaCamera,
  FaTshirt,
  FaFemale,
  FaShoePrints,
  FaShoppingBag,
  FaSpa,
  FaAppleAlt,
  FaCouch,
  FaBlender,
  FaFutbol,
  FaBook,
  FaGamepad,
  FaGem,
} from "react-icons/fa";

const categoriesData = [
  { name: "Mobiles", icon: FaMobileAlt, color: "#2874f0" },
  { name: "Laptops", icon: FaLaptop, color: "#17a2b8" },
  { name: "Computers", icon: FaDesktop, color: "#6610f2" },
  { name: "Electronics", icon: FaPlug, color: "#fd7e14" },
  { name: "TVs", icon: FaTv, color: "#e83e8c" },
  { name: "Headphones", icon: FaHeadphones, color: "#20c997" },
  { name: "Smart Watches", icon: FaClock, color: "#007bff" },
  { name: "Cameras", icon: FaCamera, color: "#6c757d" },
  { name: "Men's Clothing", icon: FaTshirt, color: "#343a40" },
  { name: "Women's Clothing", icon: FaFemale, color: "#d63384" },
  { name: "Shoes", icon: FaShoePrints, color: "#dc3545" },
  { name: "Bags", icon: FaShoppingBag, color: "#7952b3" },
  { name: "Beauty", icon: FaSpa, color: "#e83e8c" },
  { name: "Grocery", icon: FaAppleAlt, color: "#28a745" },
  { name: "Furniture", icon: FaCouch, color: "#b07d62" },
  { name: "Home Appliances", icon: FaBlender, color: "#ffc107" },
  { name: "Sports", icon: FaFutbol, color: "#198754" },
  { name: "Books", icon: FaBook, color: "#0dcaf0" },
  { name: "Toys", icon: FaGamepad, color: "#f87171" },
  { name: "Accessories", icon: FaGem, color: "#8b5cf6" },
];

const CategoryBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-white border-bottom shadow-sm mb-3 category-bar-wrapper">
      <div className="container-fluid px-lg-4">
        <div className="d-flex overflow-auto py-2 category-scroll-container align-items-center">
          {categoriesData.map((cat) => {
            const Icon = cat.icon;
            const isSelected = currentCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`btn btn-link text-decoration-none d-flex flex-column align-items-center px-3 py-1 flex-shrink-0 category-item-btn ${
                  isSelected ? "active" : ""
                }`}
              >
                <div
                  className="category-icon-circle d-flex align-items-center justify-content-center rounded-circle mb-1 transition-all"
                  style={{
                    backgroundColor: isSelected ? cat.color : "#f1f3f6",
                    color: isSelected ? "#fff" : cat.color,
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`small fw-semibold text-center category-label ${
                    isSelected ? "text-primary" : "text-dark"
                  }`}
                  style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
