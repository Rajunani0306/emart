import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [password, setPassword] =
    useState("");

  const register = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    alert("Registration successful");

    navigate("/login");
  };

  return (
    <div className="register-page">

      <form
        className="register-form"
        onSubmit={register}
      >

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?
        </p>

        <button
          type="button"
          className="login-link"
          onClick={() =>
            navigate("/login")
          }
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Register;