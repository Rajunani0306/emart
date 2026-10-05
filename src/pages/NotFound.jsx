import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="not-found-page py-5 text-center">
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="card shadow-sm border-0 rounded-4 p-5 bg-white">
          <div className="text-warning mb-3">
            <FaExclamationTriangle size={70} />
          </div>
          <h1 className="fw-black text-dark mb-1">404</h1>
          <h4 className="fw-bold text-dark mb-2">Page Not Found</h4>
          <p className="text-muted mb-4">
            The page you are looking for might have been moved, removed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-primary fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 mx-auto">
            <FaHome /> Return to RAJU MART Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
