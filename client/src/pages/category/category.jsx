import React from "react";
import { useParams } from "react-router-dom";

import products from "../../data/product";
import ProductCard from "../../components/productcard/ProductCard";

import "./category.css";

function Category() {
  const { categoryName } = useParams();

  const filteredProducts =
    categoryName === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() ===
            categoryName.toLowerCase()
        );

  return (
    <div className="category-page">
      <h2>{categoryName} Products</h2>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    </div>
  );
}

export default Category;