import React from 'react';
import './Services.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

const Services = () => {
  const { isLoggedIn } = useAuth();
  
  const services = [
    {
      id: 1,
      title: 'Photography',
      description: 'Capture the perfect moments with our professional photography services.',
      image: '/assets/photography.jpg',
      link: '/photography',
    },
    {
      id: 2,
      title: 'Digital Art & Painting',
      description: 'Explore stunning artworks and get custom paintings created just for you.',
      image: '/assets/painting.jpg',
      link: '/',
    },
    {
      id: 3,
      title: 'Art Showcase',
      description: 'Showcase your creations to a global audience on our platform.',
      image: '/assets/art-showcase.jpg',
      link: isLoggedIn ? '/dashboard' : '/login',
    },
  ];

  return (
    <>
    <motion.div
      className="services-container"
    >
      <h1 className="services-heading">Our Services</h1>
      <div className="services-grid">
        {services.map((service) => (
          <Link to={service.link}>
          <motion.div
            key={service.id}
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>

    </>
  );
};

export default Services;