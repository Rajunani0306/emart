import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Loading...", fullPage = false }) => {
  if (fullPage) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" variant="primary" style={{ width: "3.5rem", height: "3.5rem" }} />
        <p className="mt-3 text-muted fw-semibold">{message}</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Spinner animation="border" variant="primary" />
      <span className="ms-3 text-muted">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
