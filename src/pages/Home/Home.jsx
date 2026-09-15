import React from "react";
import { useNavigate } from "react-router-dom";

import Carousel from "../../components/carousel/Carousel";
import ProductCard from "../../components/productcard/ProductCard";

import products from "../../data/product";

import "./Home.css";

function Home({ addToCart }) {
  const navigate = useNavigate();
  const categories = [
    "Mobiles",
    "Laptops",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Furniture",
    "Bags",
  ];

  return (
    <div className="home">

      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        {categories.map((category) => (
          <div
            className="category-item"
            key={category}
            onClick={() =>
              navigate(
                `/category/${category}`
              )
            }
          >
            <div className="category-icon">
              🛍️
            </div>

            <p>{category}</p>
          </div>
        ))}

      </section>

      {/* ================= CAROUSEL ================= */}

      <Carousel />

      {/* ================= TOP DEALS ================= */}

      <section className="product-section">

        <div className="section-title">

          <h2>Top Deals</h2>

          <button
            onClick={() =>
              navigate("/category/All")
            }
          >
            VIEW ALL
          </button>

        </div>

        <div className="product-grid">

          {products &&
          products.length > 0 ? (
            products
              .slice(0, 10)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))
          ) : (
            <p>No products available</p>
          )}

        </div>

      </section>

    </div>
  );
}

export default Home;