import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./BuyerDashboard.css";
import axios from "axios";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Retrieve the image ID from the URL
  const token = localStorage.getItem("token");  // const { src } = location.state || {}; // Retrieve the src

  const [selectedFormat, setSelectedFormat] = useState("JPEG");
  const [selectedQuality, setSelectedQuality] = useState("Standard");
  const [price, setPrice] = useState(10); // Initial price for default options
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Example image URL; replace this with your dynamic logic for image URLs
  const imageURL = `/assets/images/sample-${id}.${selectedFormat.toLowerCase()}`;

  const formatOptions = [
    { label: "JPEG", price: 10 },
    { label: "PNG", price: 15 },
    { label: "TIFF", price: 20 },
  ];

  const qualityOptions = [
    { label: "Standard", price: 0 },
    { label: "High", price: 5 },
    { label: "Ultra", price: 10 },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("success") === "true") {
      setIsPaymentSuccessful(true);
    } else {
      const isPaymentDone = localStorage.getItem("paymentSuccess") === "true";
      if (isPaymentDone) {
        setIsPaymentSuccessful(true);
        localStorage.removeItem("paymentSuccess");
      }
    }
  }, [location.search]);
  

  const handleFormatChange = (format) => {
    const selected = formatOptions.find((f) => f.label === format);
    setSelectedFormat(format);
    setPrice(selected.price + qualityOptions.find((q) => q.label === selectedQuality).price);
  };

  const handleQualityChange = (quality) => {
    const selected = qualityOptions.find((q) => q.label === quality);
    setSelectedQuality(quality);
    setPrice(formatOptions.find((f) => f.label === selectedFormat).price + selected.price);
  };

  const handlePayment = () => {
    localStorage.setItem("paymentSuccess", "true");
    navigate(`/pay/${id}`);
  };
  
  useEffect(() => {
    const isPaymentDone = localStorage.getItem("paymentSuccess") === "true";
    if (isPaymentDone) {
      setIsPaymentSuccessful(true);
      localStorage.removeItem("paymentSuccess"); // Clear after use
    }
  }, []);

  const handleDownload = async () => {
    if (!isPaymentSuccessful) {
      alert("Please complete the payment to download the image.");
      return;
    }
  
    try {
      const response = await fetch(
        `/api/download/${id}?format=${selectedFormat.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `image-${id}.${selectedFormat.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      // Record the purchase after successful download
      await handleBuy();
  
      // Redirect to showcase page
      navigate(`/showcase/${id}`);
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("An error occurred while downloading. Please try again.");
    }
  };
  
  const handleBuy = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/buy",
        {},  // Empty body, or add purchase details if necessary
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass token in Authorization header
          },
        }
      );
  
      console.log(response.data);
    } catch (error) {
      console.error("Error processing purchase:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="parent">
      <div className="dashboard-wrapper">
        <h1>Buyer Dashboard</h1>
        <div className="options-container">
          <div className="option-group">
            <h3>Select Format</h3>
            {formatOptions.map((option) => (
              <label key={option.label}>
                <input
                  type="radio"
                  name="format"
                  value={option.label}
                  checked={selectedFormat === option.label}
                  onChange={() => handleFormatChange(option.label)}
                />
                {option.label} (${option.price})
              </label>
            ))}
          </div>

          <div className="option-group">
            <h3>Select Quality</h3>
            {qualityOptions.map((option) => (
              <label key={option.label}>
                <input
                  type="radio"
                  name="quality"
                  value={option.label}
                  checked={selectedQuality === option.label}
                  onChange={() => handleQualityChange(option.label)}
                />
                {option.label} (+${option.price})
              </label>
            ))}
          </div>
        </div>

        <div className="summary">
          <h3>Order Summary</h3>
          <p>
            Format: <strong>{selectedFormat}</strong>
          </p>
          <p>
            Quality: <strong>{selectedQuality}</strong>
          </p>
          <p>
            Total Price: <strong>${price}</strong>
          </p>
        </div>

        <div className="actions2">
          <button onClick={handlePayment} disabled={isPaymentSuccessful}>
          {isPaymentSuccessful ? "Payment Completed" : "Pay Now"}
          </button>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
