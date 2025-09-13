// src/api/auth.js
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL;

export const register = (name, email, password) =>
  axios.post(`${BASE}/auth/register`, { name, email, password });

export const login = (username, password) =>
  axios.post(`${BASE}/auth/login`, { username, password });
