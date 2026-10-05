import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFire, FaAward, FaBolt, FaArrowRight, FaTags, FaClock } from "react-icons/fa";
import CategoryBar from "../components/CategoryBar";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../services/api";

const Home = () => {
  const [collections, setCollections] = useState({
    featured: [],
    trending: [],
    bestSellers: [],
    deals: [],
    newArrivals: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await API.get("/products/home/collections");
        setCollections(data);
      } catch (err) {
        console.warn("Failed to fetch home collections from API:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="home-page pb-5">
      {/* Category Strip */}
      <CategoryBar />

      <div className="container-fluid px-lg-4">
        {/* Hero Banner Carousel */}
        <HeroBanner />

        {loading ? (
          <LoadingSpinner message="Loading exciting deals for you..." />
        ) : (
          <>
            {/* DEALS OF THE DAY */}
            {collections.deals && collections.deals.length > 0 && (
              <section className="deal-section bg-white p-3 p-md-4 rounded-3 shadow-sm mb-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-danger text-white p-2 rounded-circle d-flex align-items-center justify-content-center">
                      <FaBolt size={18} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-dark">Top Deals of the Day</h4>
                      <span className="text-muted small d-flex align-items-center gap-1">
                        <FaClock size={12} className="text-danger" /> Ending soon — Grab before stock runs out!
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/products"
                    className="btn btn-outline-primary btn-sm rounded-pill fw-semibold d-flex align-items-center gap-1 mt-2 mt-sm-0"
                  >
                    <span>View All Deals</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
                  {collections.deals.slice(0, 4).map((product) => (
                    <div key={product._id || product.id} className="col">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FEATURED PRODUCTS */}
            {collections.featured && collections.featured.length > 0 && (
              <section className="featured-section bg-white p-3 p-md-4 rounded-3 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary text-white p-2 rounded-circle d-flex align-items-center justify-content-center">
                      <FaAward size={18} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-dark">Featured Products</h4>
                      <span className="text-muted small">Hand-picked premium selections</span>
                    </div>
                  </div>
                  <Link
                    to="/products"
                    className="btn btn-outline-primary btn-sm rounded-pill fw-semibold d-flex align-items-center gap-1"
                  >
                    <span>Explore</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
                  {collections.featured.slice(0, 4).map((product) => (
                    <div key={product._id || product.id} className="col">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROMOTIONAL GRID BANNER */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <div
                  className="p-4 rounded-3 text-white d-flex align-items-center justify-content-between shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
                    minHeight: "180px",
                  }}
                >
                  <div>
                    <span className="badge bg-warning text-dark mb-2">SMARTPHONES</span>
                    <h3 className="fw-bold mb-1">Latest 5G Mobiles</h3>
                    <p className="mb-3 small opacity-90">Exchange offers & No Cost EMI available</p>
                    <Link
                      to="/products?category=Mobiles"
                      className="btn btn-light btn-sm fw-bold rounded-pill text-primary"
                    >
                      Shop Mobiles
                    </Link>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300"
                    alt="Mobiles"
                    className="rounded-3 shadow d-none d-sm-block"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className="p-4 rounded-3 text-white d-flex align-items-center justify-content-between shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
                    minHeight: "180px",
                  }}
                >
                  <div>
                    <span className="badge bg-light text-danger mb-2">FOOTWEAR & ACCESSORIES</span>
                    <h3 className="fw-bold mb-1">Sneakers & Bags</h3>
                    <p className="mb-3 small opacity-90">Minimum 40% Off on Top Global Brands</p>
                    <Link
                      to="/products?category=Shoes"
                      className="btn btn-light btn-sm fw-bold rounded-pill text-danger"
                    >
                      Discover Collection
                    </Link>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
                    alt="Shoes"
                    className="rounded-3 shadow d-none d-sm-block"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            {/* TRENDING PRODUCTS */}
            {collections.trending && collections.trending.length > 0 && (
              <section className="trending-section bg-white p-3 p-md-4 rounded-3 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-warning text-dark p-2 rounded-circle d-flex align-items-center justify-content-center">
                      <FaFire size={18} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-dark">Trending Now</h4>
                      <span className="text-muted small">Most popular items shoppers are loving</span>
                    </div>
                  </div>
                  <Link
                    to="/products"
                    className="btn btn-outline-primary btn-sm rounded-pill fw-semibold d-flex align-items-center gap-1"
                  >
                    <span>View All</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
                  {collections.trending.slice(0, 4).map((product) => (
                    <div key={product._id || product.id} className="col">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BEST SELLERS */}
            {collections.bestSellers && collections.bestSellers.length > 0 && (
              <section className="bestsellers-section bg-white p-3 p-md-4 rounded-3 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-success text-white p-2 rounded-circle d-flex align-items-center justify-content-center">
                      <FaTags size={18} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-dark">Best-Selling Items</h4>
                      <span className="text-muted small">Top rated customer favorites</span>
                    </div>
                  </div>
                  <Link
                    to="/products"
                    className="btn btn-outline-primary btn-sm rounded-pill fw-semibold d-flex align-items-center gap-1"
                  >
                    <span>See More</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
                  {collections.bestSellers.slice(0, 4).map((product) => (
                    <div key={product._id || product.id} className="col">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
