import React, { useRef, useEffect, useState } from "react";
import './Menubar.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link , useLocation} from "react-router-dom";

const Menubar2 = () => {
  const categories = [
    { name: "All", path: "/photography" },
    { name: "Beauty", path: "/beauty" },
    { name: "Architecture", path: "/architecture" },
    { name: "Nature", path: "/nature" },
    { name: "Art", path: "/" },
    { name: "Landscapes", path: "/landscapes" },
    { name: "Macro", path: "/macro" },
    { name: "Wildlife", path: "/wildlife" },
    { name: "Night Sky", path: "/nightsky" },
    { name: "Flowers", path: "/flowers" },
    { name: "Moutains", path: "/mountains" },
    { name: "Clouds", path: "/clouds" },
  ];

  const location = useLocation(); 
  const [heading, setHeading] = useState("All"); 

  const menuRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = 200;
    if (menuRef.current) {
      if (direction === "left") {
        menuRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        menuRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const [activeCategory, setActiveCategory] = useState("/");
  const [isFixed, setIsFixed] = useState(false);
  const menubarRef = useRef(null);

  useEffect(() => {
    setActiveCategory(location.pathname); 
  }, [location.pathname]);


  useEffect(() => {
    const currentCategory = categories.find(category => category.path === location.pathname);
    setHeading(currentCategory ? currentCategory.name : "All");
  }, [location.pathname, categories]);

  useEffect(() => {
    const handleScroll = () => {
      const menubarTop = menubarRef.current?.offsetTop || 0;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= menubarTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (  
    <div className="mainmenu">
      <div className="heading">
        <p>Explore</p>
        <h1>{heading === "All" ? "Photography" : heading}</h1>
      </div>
      <div ref={menubarRef} className={`menubar ${isFixed ? "fixed" : ""}`}>
        <input type="checkbox" id="check" />
        <label htmlFor="left" className="arrow-btn leftbtn" onClick={() => handleScroll("left")}>
          <ArrowBackIosIcon sx={{ fontSize: 35 }} />
        </label>
        <div className="options" ref={menuRef}>
          {categories.map((category, index) => (
            <button key={index} className={`menu-item ${activeCategory === category.path ? "active" : ""}`}>
              <Link to={category.path} className="menuItem" onClick={() => setActiveCategory(category.path)}>
                {category.name}
              </Link>
            </button>
          ))}
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="right" className="arrow-btn rightbtn" onClick={() => handleScroll("right")}>
          <ArrowForwardIosIcon sx={{ fontSize: 35 }} />
        </label>
      </div>
    </div>
  );
};

export default Menubar2;