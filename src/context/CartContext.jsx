import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Synchronize cart with backend on login
  useEffect(() => {
    if (isAuthenticated) {
      const syncCart = async () => {
        try {
          if (cartItems.length > 0) {
            const { data } = await API.post("/cart/sync", {
              localItems: cartItems.map((item) => ({
                product: item.product,
                quantity: item.quantity,
              })),
            });
            if (data?.items) {
              const formatted = data.items.map((i) => ({
                product: i.product?._id || i.product,
                name: i.product?.name || "Product",
                price: i.product?.price || i.price,
                originalPrice: i.product?.originalPrice || i.price * 1.2,
                image: i.product?.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                stock: i.product?.stock ?? 10,
                brand: i.product?.brand || "Brand",
                quantity: i.quantity,
              }));
              setCartItems(formatted);
            }
          } else {
            // Fetch cart from backend
            const { data } = await API.get("/cart");
            if (data?.items && data.items.length > 0) {
              const formatted = data.items.map((i) => ({
                product: i.product?._id || i.product,
                name: i.product?.name || "Product",
                price: i.product?.price || i.price,
                originalPrice: i.product?.originalPrice || i.price * 1.2,
                image: i.product?.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                stock: i.product?.stock ?? 10,
                brand: i.product?.brand || "Brand",
                quantity: i.quantity,
              }));
              setCartItems(formatted);
            }
          }
        } catch (error) {
          console.warn("Cart synchronization with backend skipped:", error.message);
        }
      };
      syncCart();
    }
  }, [isAuthenticated]);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    const prodId = product._id || product.id;
    const existingIndex = cartItems.findIndex((item) => item.product === prodId);

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = cartItems.map((item) =>
        item.product === prodId
          ? { ...item, quantity: item.quantity + Number(quantity) }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          product: prodId,
          name: product.name || product.title,
          brand: product.brand || "",
          price: product.price,
          originalPrice: product.originalPrice || Math.round(product.price * 1.25),
          image: Array.isArray(product.images) ? product.images[0] : (product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"),
          stock: product.stock !== undefined ? product.stock : 10,
          quantity: Number(quantity),
        },
      ];
    }

    setCartItems(updatedCart);
    showToast(`Added "${product.name || product.title}" to Cart!`);

    // Sync to backend if authenticated
    if (isAuthenticated) {
      try {
        await API.post("/cart", { productId: prodId, quantity });
      } catch (err) {
        console.warn("Backend cart update skipped:", err.message);
      }
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    const removedItem = cartItems.find((item) => item.product === productId);
    const updatedCart = cartItems.filter((item) => item.product !== productId);
    setCartItems(updatedCart);

    if (removedItem) {
      showToast(`Removed "${removedItem.name}" from cart`);
    }

    if (isAuthenticated) {
      try {
        await API.delete(`/cart/${productId}`);
      } catch (err) {
        console.warn("Backend remove item skipped:", err.message);
      }
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQty) => {
    const qty = Number(newQty);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.product === productId ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedCart);

    if (isAuthenticated) {
      try {
        await API.put(`/cart/${productId}`, { quantity: qty });
      } catch (err) {
        console.warn("Backend update quantity skipped:", err.message);
      }
    }
  };

  // Clear cart
  const clearCart = async () => {
    setCartItems([]);
    if (isAuthenticated) {
      try {
        await API.delete("/cart");
      } catch (err) {
        console.warn("Backend clear cart skipped:", err.message);
      }
    }
  };

  // Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalItemsPrice = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price * 1.25) * item.quantity,
    0
  );
  const discountPrice = Math.max(0, originalItemsPrice - itemsPrice);
  const shippingPrice = itemsPrice > 500 || itemsPrice === 0 ? 0 : 40;
  const taxPrice = Math.round(itemsPrice * 0.18); // 18% GST
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        itemsPrice,
        originalItemsPrice,
        discountPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
