import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Pay.css';

const Pay = () => {
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 20 seconds
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Image ID from the URL

  useEffect(() => {
    let timer;

    // Start countdown if QR code is displayed and timer is active
    if (showQRCode && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // When timer reaches zero, simulate successful payment and redirect
    if (timeLeft === 0) {
      clearTimeout(timer);
      setPaymentSuccessful(true);

      // Redirect back to BuyerDashboard after a delay
      setTimeout(() => navigate(`/buyer-dashboard/${id}`), 3000);
    }

    // Cleanup timeout on component unmount or when dependencies change
    return () => clearTimeout(timer);
  }, [timeLeft, showQRCode, navigate, id]);

  // Handle the "Pay Now" button click
  const handlePayNow = () => {
    setShowQRCode(true);
  };

  return (
    <div className="parent">
      <div className="pay-container">
        <h1>Complete Your Payment</h1>

        {/* Initial payment screen */}
        {!showQRCode ? (
          <div className="pay-initial">
            <p>Click the button below to display the QR code and start the payment process.</p>
            <button onClick={handlePayNow} className="pay-now-button">
              Pay Now
            </button>
          </div>
        ) : (
          // QR code payment section
          <div className="qr-code-section">
            {!paymentSuccessful ? (
              <>
                <img
                  src="/assets/sample-qr-code.jpg" // Replace with actual QR code image URL
                  alt="QR Code for Payment"
                  className="qr-code-image"
                />
                <p>Scan the QR code to pay.</p>
                <div className="timer">
                  <p>Time Left: <strong>{timeLeft}s</strong></p>
                </div>
              </>
            ) : (
              // Payment success message
              <div className="payment-success">
                <h2>Payment Successful 🎉</h2>
                <p>Thank you for your payment!</p>
                <p>Redirecting you back to the dashboard...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pay;
