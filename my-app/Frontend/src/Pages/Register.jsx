import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error message when user types
    setSuccess(""); // Clear success message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.name && form.email && form.password) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password
        });
        setSuccess(response.data.message); // Success message from backend
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return ( 
    <>
      <div className="parent">
        <div className="login-page">
          <div className="login-box fade-in">
            <h2 className="login-title">Create Your Account ✨</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="login-input"
              />
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="login-input"
              />
              {error && <p className="login-error">{error}</p>}
              {success && <p className="login-success">{success}</p>}
              <button type="submit" className="login-button">Register</button>
            </form>
            <p className="signup-link">
              Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
