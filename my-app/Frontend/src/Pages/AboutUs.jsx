import React from "react";
import "./AboutUs.css";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const AboutUs = () => { 
  return (
    <> 
      {/* Hero Section */}
      <section className="about-us-hero"> 
        <motion.div 
          className="hero-content" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h1 className="hero-title">Welcome to Pixel End</h1>
          <p className="hero-subtitle">
            Unleashing creativity, bridging artistry, and connecting admirers globally.
          </p>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="container">
          <motion.h2 
            className="section-title" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h2>
          <motion.p 
            className="section-description" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            At <span className="highlight">PixelEnd</span>, we are more than just a platform; we are a movement to 
            celebrate creativity and artistry. We provide a space for photographers, painters, 
            and art enthusiasts to share their passion and showcase their masterpieces to the world.
          </motion.p>

          <div className="mission-vision-grid">
            <motion.div 
              className="mission" 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="sub-title">Our Mission</h3>
              <p className="text-content">
                Empowering artists with tools and opportunities to share their talent, reach 
                global audiences, and foster a vibrant community of art enthusiasts.
              </p>
            </motion.div>
            <motion.div 
              className="vision" 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="sub-title">Our Vision</h3>
              <p className="text-content">
                To make art and photography accessible to all, inspiring creativity, and 
                nurturing the next generation of artists.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Choose Pixel End?</h2>
          <div className="benefits-grid">
            {[
              { title: "Showcase Artwork", desc: "Easily display your creations and attract art lovers worldwide." },
              { title: "Connect with Community", desc: "Join a passionate network of creators and admirers." },
              { title: "Seamless Experience", desc: "Enjoy a user-friendly interface designed for artists and buyers." },
              { title: "Secure Transactions", desc: "Reliable payment systems for a smooth buying and selling process." },
            ].map((benefit, index) => (
              <motion.div 
                className="benefit-card" 
                key={index} 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <motion.div 
          className="container" 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3  }}
        >
          <h2 className="cta-title">Join the Movement</h2>
          <p className="cta-text">
            Be a part of a thriving artistic community and share your creativity with the world.
          </p>
          <Link to="/"> 
          <motion.button 
            className="cta-button" 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            Explore Now
          </motion.button>
          </Link>
        </motion.div>
      </section>

    </> 
  );
};

export default AboutUs;
