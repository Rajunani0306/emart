import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./delivery.css";

function Delivery({ orders }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] =
    useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] =
    useState("");
  const [payment, setPayment] =
    useState("COD");

  const submitOrder = (e) => {
    e.preventDefault();

    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      alert("Please fill all details");
      return;
    }

    alert(
      `Order placed successfully!\nPayment: ${payment}`
    );

    navigate("/orders");
  };

  return (
    <div className="delivery-page">

      <form
        className="delivery-form"
        onSubmit={submitOrder}
      >

        <h1>Delivery Address</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value)
          }
        />

        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            value="COD"
            checked={payment === "COD"}
            onChange={(e) =>
              setPayment(e.target.value)
            }
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="UPI"
            checked={payment === "UPI"}
            onChange={(e) =>
              setPayment(e.target.value)
            }
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="Card"
            checked={payment === "Card"}
            onChange={(e) =>
              setPayment(e.target.value)
            }
          />
          Credit / Debit Card
        </label>

        <button type="submit">
          PLACE ORDER
        </button>

      </form>

    </div>
  );
}

export default Delivery;