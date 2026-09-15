import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/navbar/navbar";

import Home from "./pages/Home/Home";
import ProductDetail from "./pages/productdetails/productdetails";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Category from "./pages/category/category";
import Cart from "./pages/cart/cart";
import Orders from "./pages/orders/orders";
import Delivery from "./pages/delivery/delivery";

import "./App.css";

function AppContent() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // ADD PRODUCT TO CART
  const addToCart = (product) => {
    setCart((oldCart) => {
      const existingProduct = oldCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return oldCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...oldCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    alert("Product added to cart!");
  };

  // REMOVE PRODUCT
  const removeFromCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // PLACE ORDER
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      products: [...cart],
      ...orderDetails,
      status: "Order Placed",
      date: new Date().toLocaleDateString(),
    };

    setOrders((oldOrders) => [
      ...oldOrders,
      newOrder,
    ]);

    setCart([]);

    navigate("/delivery");
  };

  return (
    <>
      <Navbar
        cartCount={cart.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home addToCart={addToCart} />
          }
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <Home addToCart={addToCart} />
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              addToCart={addToCart}
            />
          }
        />

        {/* CATEGORY */}
        <Route
          path="/category/:categoryName"
          element={
            <Category
              addToCart={addToCart}
            />
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={
            <Orders orders={orders} />
          }
        />

        {/* DELIVERY */}
        <Route
          path="/delivery"
          element={
            <Delivery orders={orders} />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <div style={{ padding: "50px", textAlign: "center" }}>
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <button onClick={() => navigate("/")}>
                Go Home
              </button>
            </div>
          }
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;