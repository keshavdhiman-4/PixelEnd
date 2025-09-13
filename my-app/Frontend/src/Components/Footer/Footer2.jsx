import React from "react";
import './Footer.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed

const Footer2 = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="footer2">
    <div className="container">
      <div className="logo-section">
        <div className="logo">
            <Link className="inLogo" to={isLoggedIn ? "/userhome" : "/"}>
                <img src="/assets/PixelEnd-removebg-preview.png" alt="PE"/>
                <h1>ixelEnd</h1>
            </Link>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/login.php/"></a>
          <a href="https://x.com/i/flow/login"></a>
          <a href="https://www.instagram.com/"></a>
        </div>
      </div>
  
      <div className="links">
        <a><Link to="/about"></Link></a>
        <a href="/developers"></a>
        <a href="/contact"></a>
        <a href="/careers"></a>
        <a href="/privacy"> </a>
        <a href="/help"></a>
      </div>
  
      <div className="button-section">
        <br></br>
        <Link to="/contact"><button className="watch-team">Contact Us</button></Link>
      </div>
    </div>
  </footer>  
  );
};

export default Footer2;
