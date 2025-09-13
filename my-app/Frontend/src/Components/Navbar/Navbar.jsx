import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar(){
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        let lastScrollTop = 0; 

        const handleScroll = () => {
            const currentScrollTop = document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                // Scrolling up
                setIsExpanded(true);
            } 
            else if (currentScrollTop === 0){
                // Scrolling down and at the very top
                setIsExpanded(false);
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Avoid negative scrolling
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // Cleanup on component unmount
        };
    }, []);

    return(
        <div>
            <nav className={`navbar ${isExpanded ? "expanded" : "collapsed"}`}>
                <div className="logo">
                    <Link className="inLogo" to="/">
                        <img src="/assets/PixelEnd-removebg-preview.png" alt="PE"/>
                        <h1>ixelEnd</h1>
                    </Link>
                </div>
                <div className="menu">
                    <input type="checkbox" id="check"/>
                    <label for="check" class="chkbtn">
                        <MenuIcon sx={{ fontSize: 35 }}/>
                    </label>
                    <ul> 
                        <li><Link className="a" to="/">Home</Link></li>
                        <li><Link className="a" to="/about">About</Link></li>
                        <li><Link className="a" to="/services">Services</Link></li>
                        <li><Link className="a" to="/contact">Contact</Link></li>
                        <li><Link to="/login"><button>Login</button></Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    ); 
}