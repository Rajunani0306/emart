import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaFilter,
  FaTimes,
  FaSearch,
  FaRedo,
  FaStar,
  FaSortAmountDown,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../services/api";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Search parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const urlCategory = searchParams.get("category") || "";
  const urlSearch = searchParams.get("search") || "";

  // State
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [category, setCategory] = useState(urlCategory);
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState(urlSearch);

  // Available metadata lists
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  // Mobile filter drawer toggle
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    setCategory(urlCategory);
    setSearchTerm(urlSearch);
    setPage(1);
  }, [urlCategory, urlSearch]);

  // Fetch filter metadata (categories, brands)
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const { data } = await API.get("/products/meta/filters");
        if (data.categories) setCategoriesList(data.categories);
        if (data.brands) setBrandsList(data.brands);
      } catch (err) {
        console.warn("Failed to fetch filter metadata:", err.message);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch products when filters or pagination changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 12);
        if (searchTerm) params.append("search", searchTerm);
        if (category && category !== "All") params.append("category", category);
        if (brand && brand !== "All") params.append("brand", brand);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minRating) params.append("minRating", minRating);
        if (sortBy) params.append("sortBy", sortBy);
        if (inStockOnly) params.append("inStock", "true");

        const { data } = await API.get(`/products?${params.toString()}`);
        setProducts(data.products || []);
        setPage(data.page || 1);
        setPages(data.pages || 1);
        setTotalProducts(data.totalProducts || 0);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, brand, minPrice, maxPrice, minRating, sortBy, inStockOnly, page, searchTerm]);

  // Reset all filters
  const resetFilters = () => {
    setCategory("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setSortBy("newest");
    setInStockOnly(false);
    setSearchTerm("");
    setPage(1);
    navigate("/products");
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat === "All" ? "" : cat);
    setPage(1);
  };

  return (
    <div className="products-catalog-page py-4">
      <div className="container-fluid px-lg-4">
        {/* Top Header & Mobile Filter Trigger */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm">
          <div>
            <h4 className="fw-bold mb-1 text-dark">
              {category ? `${category} Collection` : "All Products"}
            </h4>
            <span className="text-muted small">
              Showing <strong>{products.length}</strong> of{" "}
              <strong>{totalProducts}</strong> products
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 mt-3 mt-sm-0">
            {/* Mobile Filter Button */}
            <button
              className="btn btn-outline-primary d-lg-none d-flex align-items-center gap-2 fw-semibold"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
            >
              <FaFilter /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <FaSortAmountDown className="text-muted d-none d-sm-block" />
              <span className="small fw-semibold text-muted d-none d-sm-inline">Sort By:</span>
              <select
                className="form-select form-select-sm shadow-none border"
                style={{ width: "180px" }}
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
          <div
            className={`col-lg-3 ${
              showMobileFilter
                ? "d-block position-fixed top-0 start-0 w-100 h-100 bg-white z-index-modal p-4 overflow-auto"
                : "d-none d-lg-block"
            }`}
          >
            <div className="bg-white p-3 p-lg-4 rounded-3 shadow-sm border filter-sidebar">
              {/* Header with Clear button */}
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2 text-dark">
                  <FaFilter className="text-primary" size={15} /> Filters
                </h5>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    onClick={resetFilters}
                    className="btn btn-link text-decoration-none btn-sm text-danger p-0 d-flex align-items-center gap-1 fw-semibold"
                  >
                    <FaRedo size={12} /> Clear All
                  </button>
                  {showMobileFilter && (
                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="btn btn-light btn-sm rounded-circle ms-2"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Keyword Search */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  Search Within
                </label>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search brand, name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setSearchTerm("")}
                    >
                      <FaTimes size={10} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  Category
                </label>
                <div className="category-filter-list overflow-auto" style={{ maxHeight: "200px" }}>
                  <div
                    className={`filter-item py-1 px-2 rounded cursor-pointer ${
                      !category ? "bg-primary text-white fw-bold" : "text-dark"
                    }`}
                    onClick={() => handleCategorySelect("All")}
                    style={{ cursor: "pointer" }}
                  >
                    All Categories
                  </div>
                  {categoriesList.map((cat) => (
                    <div
                      key={cat}
                      className={`filter-item py-1 px-2 rounded cursor-pointer ${
                        category.toLowerCase() === cat.toLowerCase()
                          ? "bg-primary text-white fw-bold"
                          : "text-dark hover-bg-light"
                      }`}
                      onClick={() => handleCategorySelect(cat)}
                      style={{ cursor: "pointer" }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              {brandsList.length > 0 && (
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">
                    Brand
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="">All Brands</option>
                    {brandsList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  Price Range (₹)
                </label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                  />
                  <span className="text-muted">-</span>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
                <div className="d-flex flex-wrap gap-1">
                  <button
                    className="btn btn-outline-secondary btn-xs py-1 px-2"
                    onClick={() => {
                      setMinPrice(0);
                      setMaxPrice(1000);
                      setPage(1);
                    }}
                  >
                    Under ₹1K
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-xs py-1 px-2"
                    onClick={() => {
                      setMinPrice(1000);
                      setMaxPrice(5000);
                      setPage(1);
                    }}
                  >
                    ₹1K - ₹5K
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-xs py-1 px-2"
                    onClick={() => {
                      setMinPrice(5000);
                      setMaxPrice(20000);
                      setPage(1);
                    }}
                  >
                    ₹5K - ₹20K
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-xs py-1 px-2"
                    onClick={() => {
                      setMinPrice(20000);
                      setMaxPrice("");
                      setPage(1);
                    }}
                  >
                    Above ₹20K
                  </button>
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  Customer Ratings
                </label>
                {[4, 3, 2].map((stars) => (
                  <div key={stars} className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ratingFilter"
                      id={`rating_${stars}`}
                      checked={minRating === String(stars)}
                      onChange={() => {
                        setMinRating(String(stars));
                        setPage(1);
                      }}
                    />
                    <label
                      className="form-check-label d-flex align-items-center gap-1 small text-dark"
                      htmlFor={`rating_${stars}`}
                    >
                      <span>{stars}★ & above</span>
                    </label>
                  </div>
                ))}
                {minRating && (
                  <button
                    className="btn btn-link btn-xs text-muted p-0 mt-1"
                    onClick={() => setMinRating("")}
                  >
                    Clear rating filter
                  </button>
                )}
              </div>

              {/* In Stock Only */}
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="inStockCheck"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setPage(1);
                  }}
                />
                <label className="form-check-label fw-semibold small text-dark" htmlFor="inStockCheck">
                  Exclude Out of Stock
                </label>
              </div>

              {showMobileFilter && (
                <button
                  className="btn btn-primary w-100 mt-3 fw-bold"
                  onClick={() => setShowMobileFilter(false)}
                >
                  Apply Filters
                </button>
              )}
            </div>
          </div>

          {/* MAIN PRODUCT GRID & PAGINATION */}
          <div className="col-lg-9">
            {loading ? (
              <LoadingSpinner message="Fetching products..." />
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3 p-5 text-center shadow-sm">
                <div className="display-1 text-muted mb-3">🔍</div>
                <h4 className="fw-bold text-dark">No Products Found</h4>
                <p className="text-muted">
                  We couldn't find any products matching your selected filters.
                </p>
                <button onClick={resetFilters} className="btn btn-primary fw-bold px-4 rounded-pill">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="row g-3 row-cols-2 row-cols-md-3">
                  {products.map((product) => (
                    <div key={product._id || product.id} className="col">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {pages > 1 && (
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      disabled={page <= 1}
                      onClick={() => {
                        setPage((prev) => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Previous
                    </button>

                    {[...Array(pages).keys()].map((pNum) => {
                      const num = pNum + 1;
                      return (
                        <button
                          key={num}
                          className={`btn btn-sm px-3 ${
                            page === num ? "btn-primary fw-bold" : "btn-outline-secondary"
                          }`}
                          onClick={() => {
                            setPage(num);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          {num}
                        </button>
                      );
                    })}

                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      disabled={page >= pages}
                      onClick={() => {
                        setPage((prev) => Math.min(prev + 1, pages));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
