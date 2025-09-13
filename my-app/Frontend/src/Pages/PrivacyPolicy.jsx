import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
    <div className="parent">
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-intro">
        Welcome to Pixel End. Your privacy is important to us, and we are committed to protecting your personal information.
      </p>

      <div className="privacy-section">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, such as when you sign up, make a purchase, or contact support.
        </p>
      </div>

      <div className="privacy-section">
        <h2>2. How We Use Your Information</h2>
        <p>
          Your data helps us enhance your experience, provide support, and improve our services.
        </p>
      </div>

      <div className="privacy-section">
        <h2>3. Data Protection</h2>
        <p>
          We implement security measures to protect your information from unauthorized access or disclosure.
        </p>
      </div>

      <div className="privacy-footer">
        <p>Last updated: April 2025</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
