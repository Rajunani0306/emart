import React from "react";
import "./orders.css";

function Orders({ orders }) {
  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Yet</h2>
        </div>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order.id}
          >

            <h3>
              Order ID: #{order.id}
            </h3>

            <p>
              Date: {order.date}
            </p>

            <p>
              Status:
              <strong>
                {order.status}
              </strong>
            </p>

            {order.products.map(
              (product) => (
                <div
                  className="order-product"
                  key={product.id}
                >

                  <img
                    src={product.image}
                    alt={product.title}
                  />

                  <div>
                    <h4>
                      {product.title}
                    </h4>

                    <p>
                      Quantity:
                      {product.quantity}
                    </p>

                    <p>
                      ₹
                      {(
                        product.price *
                        product.quantity
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>
              )
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;