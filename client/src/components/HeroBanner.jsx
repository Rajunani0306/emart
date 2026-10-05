import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "MEGA ELECTRONICS SALE",
    subtitle: "Up to 50% Off on Laptops, Mobiles, and Smart Gadgets",
    tag: "LIMITED TIME OFFER",
    bgGradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=80",
    link: "/products?category=Electronics",
    btnText: "Shop Electronics",
  },
  {
    id: 2,
    title: "NEW SEASON FASHION",
    subtitle: "Trending Styles in Men's & Women's Wear with Extra 20% Off",
    tag: "FRESH ARRIVALS",
    bgGradient: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
    link: "/products?category=Men%27s%20Clothing",
    btnText: "Explore Fashion",
  },
  {
    id: 3,
    title: "SMART TECH & ACCESSORIES",
    subtitle: "Premium Noise-Cancelling Headphones & Smart Watches",
    tag: "BEST SELLERS",
    bgGradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80",
    link: "/products?category=Headphones",
    btnText: "Discover Audio",
  },
  {
    id: 4,
    title: "HOME & LIVING MAKEOVER",
    subtitle: "Upgrade your Living Space with Modern Furniture & Appliances",
    tag: "SUPER SAVER DAYS",
    bgGradient: "linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop&q=80",
    link: "/products?category=Furniture",
    btnText: "Shop Home Decor",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="hero-banner-container position-relative overflow-hidden rounded-3 mb-4 shadow-sm">
      <div
        className="hero-slide d-flex align-items-center justify-content-between p-4 p-md-5 text-white position-relative"
        style={{
          background: slide.bgGradient,
          minHeight: "340px",
          transition: "background 0.5s ease-in-out",
        }}
      >
        {/* Text Content */}
        <div className="hero-content z-2 col-12 col-md-7 pe-md-4">
          <span className="badge bg-warning text-dark mb-2 px-3 py-1 text-uppercase fw-bold letter-spacing-1 rounded-pill">
            {slide.tag}
          </span>
          <h1 className="display-6 fw-bold mb-2 tracking-tight">{slide.title}</h1>
          <p className="lead fs-6 mb-4 opacity-90">{slide.subtitle}</p>
          <div className="d-flex gap-3">
            <Link
              to={slide.link}
              className="btn btn-light btn-lg px-4 fw-bold shadow rounded-pill text-dark d-inline-flex align-items-center gap-2 hero-btn"
            >
              {slide.btnText}
            </Link>
            <Link
              to="/products"
              className="btn btn-outline-light btn-lg px-4 fw-bold rounded-pill d-none d-sm-inline-flex align-items-center"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image-wrapper col-md-5 d-none d-md-flex justify-content-center align-items-center z-1">
          <img
            src={slide.image}
            alt={slide.title}
            className="img-fluid rounded-4 shadow-lg hero-img"
            style={{
              maxHeight: "280px",
              objectFit: "cover",
              width: "100%",
              maxWidth: "420px",
            }}
          />
        </div>
      </div>

      {/* Nav Controls */}
      <button
        onClick={prevSlide}
        className="carousel-control-btn prev-btn position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow p-2 ms-2 z-3"
        aria-label="Previous Slide"
      >
        <FaChevronLeft size={16} />
      </button>
      <button
        onClick={nextSlide}
        className="carousel-control-btn next-btn position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow p-2 me-2 z-3"
        aria-label="Next Slide"
      >
        <FaChevronRight size={16} />
      </button>

      {/* Slide Indicators */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-2 z-3">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`indicator-dot rounded-pill border-0 transition-all ${
              idx === currentSlide ? "bg-white active-dot" : "bg-white-50"
            }`}
            style={{
              width: idx === currentSlide ? "24px" : "8px",
              height: "8px",
              opacity: idx === currentSlide ? 1 : 0.5,
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
