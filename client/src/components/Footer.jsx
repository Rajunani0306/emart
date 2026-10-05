import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaStore,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-3 mt-5">
      {/* Feature Highlights Bar */}
      <div className="container pb-4 border-bottom border-secondary mb-4">
        <div className="row g-3 text-center text-md-start">
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
            <div className="feature-icon bg-secondary bg-opacity-25 p-3 rounded-circle text-warning">
              <FaTruck size={22} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Free Shipping</h6>
              <span className="text-secondary small">On orders over ₹500</span>
            </div>
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
            <div className="feature-icon bg-secondary bg-opacity-25 p-3 rounded-circle text-warning">
              <FaShieldAlt size={22} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Secure Payment</h6>
              <span className="text-secondary small">100% Protected checkout</span>
            </div>
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
            <div className="feature-icon bg-secondary bg-opacity-25 p-3 rounded-circle text-warning">
              <FaUndoAlt size={22} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Easy Returns</h6>
              <span className="text-secondary small">7-Day Hassle-free policy</span>
            </div>
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
            <div className="feature-icon bg-secondary bg-opacity-25 p-3 rounded-circle text-warning">
              <FaHeadset size={22} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">24/7 Support</h6>
              <span className="text-secondary small">Dedicated support team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-warning text-dark p-2 rounded-circle">
                <FaStore size={20} />
              </div>
              <span className="fs-4 fw-black tracking-wide text-white">
                RAJU <span className="text-warning">MART</span>
              </span>
            </div>
            <p className="text-secondary small mb-3">
              RAJU MART is India’s ultimate full-stack online shopping destination,
              offering top-tier electronics, fashion, home essentials, and gadgets
              at unbeatable prices with high reliability.
            </p>
            <div className="d-flex gap-2">
              <a href="#facebook" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white">
                <FaFacebookF size={14} />
              </a>
              <a href="#twitter" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white">
                <FaTwitter size={14} />
              </a>
              <a href="#instagram" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white">
                <FaInstagram size={14} />
              </a>
              <a href="#youtube" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-warning mb-3">About Us</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2 mb-0">
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Company Info</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Careers</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Press Releases</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Wholesale</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Corporate Info</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-warning mb-3">Help Center</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2 mb-0">
              <li><Link to="/orders" className="text-secondary text-decoration-none hover-light">Track Order</Link></li>
              <li><Link to="/orders" className="text-secondary text-decoration-none hover-light">Shipping Policy</Link></li>
              <li><Link to="/orders" className="text-secondary text-decoration-none hover-light">Return & Refund</Link></li>
              <li><Link to="/cart" className="text-secondary text-decoration-none hover-light">Shopping FAQ</Link></li>
              <li><Link to="/profile" className="text-secondary text-decoration-none hover-light">Contact Support</Link></li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-warning mb-3">Consumer Policy</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2 mb-0">
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Terms & Conditions</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Privacy Policy</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Security Measures</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Sitemap</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-light">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Registered Office */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-warning mb-3">Mail Us</h6>
            <p className="text-secondary small mb-1">RAJU MART Internet Private Ltd,</p>
            <p className="text-secondary small mb-1">Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
            <p className="text-secondary small mb-0">Outer Ring Road, Bengaluru, Karnataka, India - 560103</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-top border-secondary pt-3 text-center text-secondary small d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">
            © 2026 <strong className="text-white">RAJU MART</strong>. All Rights Reserved. Built with React & Node.js.
          </p>
          <div className="d-flex gap-3">
            <span className="badge bg-secondary text-white">100% Genuine</span>
            <span className="badge bg-secondary text-white">PCI-DSS Compliant</span>
            <span className="badge bg-secondary text-white">Razorpay Sandbox</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
