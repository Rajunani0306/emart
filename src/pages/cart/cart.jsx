import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Your Cart is Empty</h1>

        <button
          onClick={() => navigate("/")}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-items">

        <h2>My Cart</h2>

        {cart.map((item) => (
          <div
            className="cart-item"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <div className="cart-info">

              <h3>{item.title}</h3>

              <p>
                ₹{item.price.toLocaleString()}
              </p>

              <div className="cart-quantity">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>

              <button
                className="remove"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                REMOVE
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="price-box">

        <h2>Price Details</h2>

        <p>
          Items:
          <span>{cart.length}</span>
        </p>

        <p>
          Total:
          <span>
            ₹{total.toLocaleString()}
          </span>
        </p>

        <hr />

        <h2>
          Total:
          <span>
            ₹{total.toLocaleString()}
          </span>
        </h2>

        <button
          onClick={() => navigate("/delivery")}
        >
          PLACE ORDER
        </button>

      </div>

    </div>
  );
}

export default Cart;