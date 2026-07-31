import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    // =======================
    // Admin Login
    // =======================

    if (role === "admin") {

      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "admin123"
      ) {

        localStorage.setItem("admin", "true");

        clearForm();

        navigate("/dashboard");

      } else {

        setError("Invalid Admin Email or Password");

        clearForm();

      }

      return;
    }

    // =======================
    // Employee Login
    // =======================

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/employee-login/",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.status) {

        localStorage.setItem(
          "employee",
          JSON.stringify(response.data)
        );

        clearForm();

        navigate("/employee-dashboard");

      } else {

        setError("Invalid Employee Email or Password");

        clearForm();

      }

    } catch (err) {

      console.log(err);

      setError("Invalid Employee Email or Password");

      clearForm();

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1 className="logo">
          Smart Inventory
        </h1>

        <p className="subtitle">
          Asset Management System
        </p>

        <div className="role-box">

          <label>

            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => {
                setRole("admin");
                clearForm();
                setError("");
              }}
            />

            <span>Admin</span>

          </label>

          <label>

            <input
              type="radio"
              value="employee"
              checked={role === "employee"}
              onChange={() => {
                setRole("employee");
                clearForm();
                setError("");
              }}
            />

            <span>Employee</span>

          </label>

        </div>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}

          <button type="submit">
            Sign In
          </button>

        </form>

        <p className="register-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;