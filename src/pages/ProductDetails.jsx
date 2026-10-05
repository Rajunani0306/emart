import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaPlus,
  FaMinus,
  FaShareAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import RatingStars from "../components/RatingStars";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewError, setReviewError] = useState(null);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        if (data.product.images && data.product.images.length > 0) {
          setSelectedImage(data.product.images[0]);
        } else if (data.product.image) {
          setSelectedImage(data.product.image);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setReviewSubmitting(true);
    setReviewSuccess(null);
    setReviewError(null);

    try {
      await API.post(`/products/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment,
      });

      setReviewSuccess("Review submitted successfully! Thank you for your feedback.");
      setReviewComment("");

      // Re-fetch product to update reviews list
      const { data } = await API.get(`/products/${id}`);
      setProduct(data.product);
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Loading product information..." />;
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="display-4 text-danger mb-3">⚠️</div>
        <h3>{error || "Product Not Found"}</h3>
        <p className="text-muted">The product you are looking for might have been removed or is unavailable.</p>
        <Link to="/products" className="btn btn-primary fw-bold px-4 rounded-pill mt-3">
          Back to Products
        </Link>
      </div>
    );
  }

  const originalPrice = product.originalPrice || Math.round(product.price * 1.25);
  const discount =
    product.discount || Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const inStock = product.stock > 0;

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"];

  return (
    <div className="product-details-page py-4">
      <div className="container-fluid px-lg-5">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-decoration-none text-muted"
              >
                {product.category}
              </Link>
            </li>
            <li className="breadcrumb-item active text-truncate" style={{ maxWidth: "300px" }}>
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Card */}
        <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
          <div className="row g-4">
            {/* LEFT COLUMN: Gallery & Actions */}
            <div className="col-lg-5 col-md-6">
              <div className="sticky-top" style={{ top: "90px" }}>
                {/* Main Preview Image */}
                <div className="product-main-preview rounded-3 p-3 d-flex align-items-center justify-content-center bg-light mb-3 position-relative border">
                  {discount > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill fw-bold shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                  <img
                    src={selectedImage || imagesList[0]}
                    alt={product.name}
                    className="img-fluid main-product-image transition-all"
                    style={{ maxHeight: "380px", objectFit: "contain" }}
                  />
                </div>

                {/* Thumbnails Row */}
                {imagesList.length > 1 && (
                  <div className="d-flex gap-2 justify-content-center mb-4 overflow-auto pb-2">
                    {imagesList.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`thumbnail-box p-1 rounded-2 border cursor-pointer ${
                          selectedImage === img ? "border-primary border-2 shadow-sm" : "border-light"
                        }`}
                        style={{ width: "70px", height: "70px", cursor: "pointer" }}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-100 h-100 object-fit-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Prominent Action Buttons */}
                <div className="d-flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="btn btn-warning btn-lg flex-fill fw-bold py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaShoppingCart />
                    <span>ADD TO CART</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!inStock}
                    className="btn btn-primary btn-lg flex-fill fw-bold py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: "#fb641b", borderColor: "#fb641b" }}
                  >
                    <FaBolt />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Details, Pricing, Specs */}
            <div className="col-lg-7 col-md-6">
              {/* Brand */}
              <span className="badge bg-light text-primary border px-3 py-1 text-uppercase fw-bold letter-spacing-1 mb-2">
                {product.brand}
              </span>

              {/* Title */}
              <h2 className="fw-bold text-dark mb-2">{product.name}</h2>

              {/* Rating & Review Summary */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="badge bg-success text-white d-inline-flex align-items-center gap-1 px-3 py-1 fs-6 rounded">
                  {Number(product.rating || 4.5).toFixed(1)} <FaStar size={12} />
                </span>
                <span className="text-muted fw-semibold">
                  {(product.numReviews || product.reviews?.length || 24).toLocaleString()} Ratings & Reviews
                </span>
                <span className="text-success fw-semibold small d-flex align-items-center gap-1">
                  <FaCheckCircle /> RAJU MART Assured
                </span>
              </div>

              <hr className="my-3 opacity-25" />

              {/* Price Details */}
              <div className="mb-3">
                <div className="d-flex align-items-baseline gap-3">
                  <span className="display-6 fw-black text-dark">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </span>
                  {originalPrice > product.price && (
                    <span className="text-muted text-decoration-line-through fs-5">
                      ₹{Number(originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-success fw-bold fs-5">
                      {discount}% off
                    </span>
                  )}
                </div>
                <div className="text-success small fw-semibold mt-1">
                  Inclusive of all taxes. Free Express Delivery available.
                </div>
              </div>

              {/* Stock Status & Quantity Selector */}
              <div className="d-flex align-items-center gap-4 my-4 p-3 bg-light rounded-3">
                <div>
                  <span className="fw-bold text-dark d-block mb-1">Availability:</span>
                  {inStock ? (
                    <span className="badge bg-success px-3 py-2 rounded-pill">
                      In Stock ({product.stock} units available)
                    </span>
                  ) : (
                    <span className="badge bg-danger px-3 py-2 rounded-pill">
                      Out of Stock
                    </span>
                  )}
                </div>

                {inStock && (
                  <div>
                    <span className="fw-bold text-dark d-block mb-1">Quantity:</span>
                    <div className="input-group input-group-sm" style={{ width: "130px" }}>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                      >
                        <FaMinus size={11} />
                      </button>
                      <input
                        type="text"
                        className="form-control text-center fw-bold bg-white"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        disabled={quantity >= product.stock}
                      >
                        <FaPlus size={11} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Value Highlights */}
              <div className="row g-2 mb-4 text-center">
                <div className="col-4">
                  <div className="p-2 border rounded-3 bg-white">
                    <FaTruck className="text-primary mb-1" size={20} />
                    <p className="small fw-bold mb-0">Free Shipping</p>
                    <span className="text-muted font-xs">Deliver in 2-3 Days</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 border rounded-3 bg-white">
                    <FaUndoAlt className="text-success mb-1" size={20} />
                    <p className="small fw-bold mb-0">7 Days Return</p>
                    <span className="text-muted font-xs">Hassle-Free Policy</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 border rounded-3 bg-white">
                    <FaShieldAlt className="text-warning mb-1" size={20} />
                    <p className="small fw-bold mb-0">100% Genuine</p>
                    <span className="text-muted font-xs">Verified Quality</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-bold text-dark border-bottom pb-2">Product Description</h5>
                <p className="text-muted lh-base">{product.description}</p>
              </div>

              {/* Specifications Table */}
              <div className="mb-4">
                <h5 className="fw-bold text-dark border-bottom pb-2">Specifications</h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-sm mb-0">
                    <tbody>
                      <tr>
                        <td className="bg-light fw-semibold text-muted" style={{ width: "35%" }}>
                          Brand
                        </td>
                        <td className="fw-medium text-dark">{product.brand}</td>
                      </tr>
                      <tr>
                        <td className="bg-light fw-semibold text-muted">Category</td>
                        <td className="fw-medium text-dark">{product.category}</td>
                      </tr>
                      {product.specifications &&
                        (product.specifications instanceof Map
                          ? Array.from(product.specifications.entries())
                          : Object.entries(product.specifications)
                        ).map(([key, val]) => (
                          <tr key={key}>
                            <td className="bg-light fw-semibold text-muted">{key}</td>
                            <td className="fw-medium text-dark">{String(val)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS SECTION */}
        <div className="card shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
          <h4 className="fw-bold text-dark mb-4">Customer Reviews & Ratings</h4>

          <div className="row g-4 mb-4">
            {/* Ratings Summary */}
            <div className="col-md-4 text-center border-end">
              <div className="display-4 fw-black text-dark mb-1">
                {Number(product.rating || 4.5).toFixed(1)}
              </div>
              <div className="mb-2">
                <RatingStars rating={product.rating || 4.5} />
              </div>
              <span className="text-muted small">
                Based on {(product.reviews?.length || 24).toLocaleString()} verified reviews
              </span>
            </div>

            {/* Submit Review Form */}
            <div className="col-md-8">
              <h5 className="fw-bold text-dark mb-2">Write a Review</h5>
              {isAuthenticated ? (
                <form onSubmit={handleReviewSubmit}>
                  {reviewSuccess && (
                    <div className="alert alert-success py-2 small">{reviewSuccess}</div>
                  )}
                  {reviewError && (
                    <div className="alert alert-danger py-2 small">{reviewError}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Your Rating:</label>
                    <div>
                      <RatingStars
                        rating={reviewRating}
                        interactive={true}
                        onRatingChange={(newVal) => setReviewRating(newVal)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Your Feedback:</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      placeholder="Share your experience with this product..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={reviewSubmitting || !reviewComment.trim()}
                    className="btn btn-primary fw-bold px-4 rounded-pill"
                  >
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-light rounded-3 text-center">
                  <p className="mb-2 text-muted">You must be logged in to post a review.</p>
                  <Link to="/login" className="btn btn-outline-primary btn-sm fw-bold rounded-pill px-4">
                    Login to Review
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list">
            <h6 className="fw-bold text-muted text-uppercase small mb-3">User Comments</h6>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, idx) => (
                <div key={idx} className="p-3 border-bottom">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-success text-white d-inline-flex align-items-center gap-1">
                      {rev.rating} <FaStar size={10} />
                    </span>
                    <strong className="text-dark">{rev.name}</strong>
                    <span className="text-muted small ms-auto">
                      {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : "Verified Buyer"}
                    </span>
                  </div>
                  <p className="text-secondary mb-0 small">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted small">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold text-dark mb-0">Similar Products You May Like</h4>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="btn btn-outline-primary btn-sm rounded-pill fw-semibold"
              >
                View Category
              </Link>
            </div>
            <div className="row g-3 row-cols-2 row-cols-md-4">
              {relatedProducts.map((rel) => (
                <div key={rel._id || rel.id} className="col">
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
