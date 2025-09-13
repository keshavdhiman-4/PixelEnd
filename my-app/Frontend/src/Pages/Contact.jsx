import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used for routing
import emailjs from 'emailjs-com'; // Install Email.js library: npm install emailjs-com
import './Contact.css';
import { useAuth } from "../context/AuthContext";
import { motion } from 'framer-motion';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Redirect to login if the user is not logged in
    if (!isLoggedIn) {
      alert("You must be logged in to send a message!");
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        'service_oawjy5j', // Replace with your Email.js service ID
        'template_2hfm91j', // Replace with your Email.js template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'qChhIHfiTPh8PQpsJ' // Replace with your Email.js public key
      );
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="parent">
      <motion.div
        className="contact-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="contact-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="contact-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to provide feedback, feel free to get in touch.
        </motion.p>
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <motion.input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <motion.textarea
              id="message"
              name="message"
              rows="2"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message"
              whileFocus={{ scale: 1.02 }}
              required
            ></motion.textarea>
          </div>
          <motion.button
            type="submit"
            className="contact-submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Contact;
