import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [username, setUsername] = useState("Guest"); // Default to 'Guest' until fetched
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, logout, username } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    console.warn("No token found in localStorage.");
                    setUsername("Guest");
                    setLoading(false);
                    return;
                }

                console.log("Token found:", token);

                const response = await fetch("http://localhost:5000/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched user data:", data);
                    setUsername(data.username || "Guest");
                } else {
                    console.error("Error in API response:", response.status);
                    setUsername("Guest");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUsername("Guest");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();  // Call fetchUser every time, not just on isLoggedIn change
    }, []);  // Only run once on mount, since we're manually checking for the token

    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
        setUsername("Guest");
    };

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const currentScrollTop = document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                setIsExpanded(true);
            } else if (currentScrollTop === 0) {
                setIsExpanded(false);
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`navbar ${isExpanded ? "expanded" : "collapsed"}`}>
                <div className="logo">
                    <Link className="inLogo" to={isLoggedIn ? "/userhome" : "/"}> 
                        <img src="/assets/PixelEnd-removebg-preview.png" alt="PE" />
                        <h1>ixelEnd</h1>
                    </Link>
                </div>
                <div className="menu">
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="chkbtn">
                        <MenuIcon sx={{ fontSize: 35 }} />
                    </label>
                    <ul className="div">
                        <li><Link className="a" to={isLoggedIn ? "/userhome" : "/"}>Home</Link></li>
                        <li><Link className="a" to="/about">About</Link></li>
                        <li><Link className="a" to="/services">Services</Link></li>
                        <li><Link className="a" to="/contact">Contact</Link></li>
                        <li
                            className="user-wrapper"
                            onMouseOver={() => setIsDropdownOpen(true)}
                            onMouseOut={() => setIsDropdownOpen(false)}
                        >
                            <AccountCircleIcon fontSize="large" />
                            {isDropdownOpen && (
                                <ul className="dropdown">
                                    <li className="main">
                                        <Link className="li" to="/dashboard">
                                        {isLoggedIn ? username : "Guest"} {/* Show 'Guest' or username */}
                                        </Link>
                                    </li>
                                    <li><Link className="li" to="/help">Help Center</Link></li>
                                    <li><Link className="li" to="/" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
