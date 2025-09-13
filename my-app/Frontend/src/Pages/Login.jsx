import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/userhome");  // Navigate to the user home page
      window.location.reload(); // Force a refresh to update the UI with the correct username
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
    <div className="parent">
      <div className="login-page">
        <div className="login-box fade-in">
          <h2 className="login-title">Welcome Back 🎨</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="login-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="login-input"
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-button">Log In</button>
          </form>
          <p className="signup-link">
            Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </div>
      </div> 
    </div>
    </>
  );
};

export default Login;
