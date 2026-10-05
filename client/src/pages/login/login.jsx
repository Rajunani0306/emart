import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoggedIn(true);

    alert("Login successful");

    navigate("/");
  };

  return (
    <div className="login-page">

      <form
        className="login-form"
        onSubmit={login}
      >

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        <p>
          New to Flipkart?
        </p>

        <button
          type="button"
          className="register-button"
          onClick={() =>
            navigate("/register")
          }
        >
          Create New Account
        </button>

      </form>

    </div>
  );
}

export default Login;