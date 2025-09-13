import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("Guest");

    // Check for token on initialization
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            fetchUsername(token); // Fetch the username if a token exists
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }, []);

    // Fetch username using the token
    const fetchUsername = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username || "Guest");
            } else {
                console.error("Failed to fetch username:", response.status);
                setUsername("Guest");
            }
        } catch (error) {
            console.error("Error fetching username:", error);
            setUsername("Guest");
        }
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        fetchUsername(token); // Fetch username after login
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        delete axios.defaults.headers.common["Authorization"];
        // setUsername("Guest");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
