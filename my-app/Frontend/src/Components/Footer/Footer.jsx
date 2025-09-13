import React from "react";
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="footer">
    <div className="container">
      <div className="logo-section">
        <div className="logo">
            <Link className="inLogo" to={isLoggedIn ? "/userhome" : "/"}>
                <img src="/assets/PixelEnd-removebg-preview.png" alt="PE"/>
                <h1>ixelEnd</h1>
            </Link>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/login.php/"><FacebookIcon/></a>
          <a href="https://x.com/i/flow/login"><XIcon/></a>
          <a href="https://www.instagram.com/"><InstagramIcon/></a>
        </div>
      </div>
  
      <div className="links">
        <a><Link to="/about">About</Link></a> 
        <a href="/developers">Developers</a>
        <a href="/contact">Contact</a>
        <a href="/careers">Careers</a>
        {/* <a href="#">Core Membership</a> */}
        <a href="/privacy">Privacy Policy</a>
        {/* <a href="#">PixelEnd Protect</a> */}
        <a href="/help">Help Center</a>
      </div>
  
      <div className="button-section">
        <p>
          Watch <span className="highlight"><b>Team</b></span> and join our{" "}
          <span className="highlight"><b>Community</b></span> Group for updates.
        </p>
        <button className="watch-team">Watch Team</button>
        <button className="join-community">Join Community</button>
      </div>
    </div>
    <div className="bottom-text">©2025 PixelEnd &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; All rights reserved</div>
  </footer>  
  );
};

export default Footer;
