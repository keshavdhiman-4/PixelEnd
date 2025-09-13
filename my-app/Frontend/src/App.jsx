import './App.css';
import React from 'react';
import HomePage from './Pages/HomePage';
import Photography from './Pages/Photography';
import Skyscapes from './Pages/Skyscapes';
import Fantasy from './Pages/Fantasy';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Anime from './Pages/Anime';
import AIArt from './Pages/AIArt';
import FanArt from './Pages/FanArt';
import Cosplay from './Pages/Cosplay';
import Adoptables from './Pages/Adoptables';
import Comics from './Pages/Comics';
import SciFi from './Pages/SciFi';
import Superheroes from './Pages/Superheroes';
import TraditionalArt from './Pages/TraditionalArt';
import DArt from './Pages/DArt';
import AboutUs from './Pages/AboutUs';
import { useEffect } from 'react';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Developers from './Pages/Developers';
import Careers from './Pages/Careers';
import HelpCenter from './Pages/HelpCenter';
import Showcase from './Components/Showcase/Showcase';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from "./Components/Navbar/Navbar";
import Navbar2 from "./Components/Navbar2/Navbar2";
import UserHome from './Pages/UserHome';
import { useAuth } from "./context/AuthContext"; // Adjust path as needed
import Footer from './Components/Footer/Footer';
import Footer2 from './Components/Footer/Footer2';
import Dashboard from './Components/Dashboard/Dashboard';
import BuyerDashboard from './Components/BuyerDashboard/BuyerDashboard';
import Pay from './Components/Pay/Pay';
import UploadImage from './Components/UploadImage/UploadImage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <>
      {isLoggedIn ? <Navbar2 /> : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skyscapes" element={<Skyscapes />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/fantasy" element={<Fantasy />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/ai-art" element={<AIArt />} />
        <Route path="/fan-art" element={<FanArt />} />
        <Route path="/cosplay" element={<Cosplay />} />
        <Route path="/adoptables" element={<Adoptables />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/sci-fi" element={<SciFi />} />
        <Route path="/superheroes" element={<Superheroes />} />
        <Route path="/traditional-art" element={<TraditionalArt />} />
        <Route path="/3d-art" element={<DArt />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/showcase/:id" element={<Showcase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buyer-dashboard/:id" element={<BuyerDashboard />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/upload" element={<UploadImage />} />
      </Routes>
      {location.pathname === "/help" ? <Footer2 /> : <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
