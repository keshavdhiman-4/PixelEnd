import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { imageData } from "../../data/imageData";
import "./Showcase.css";

const Showcase = () => { 
  const { id } = useParams();
  console.log('ID from URL:', id, typeof id);

  const navigate = useNavigate();
  const image = imageData.find((img) => img.id === parseInt(id));
  console.log('Image from Data:', image); // Log the found image data


  // const { src } = location.state || {};

  if (!image) {
    console.error(`Image with ID ${id} not found`);
    return <p>Image not found</p>;
  }
  

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false); // State to track if the image is added to wishlist
  const imageRef = useRef(null);

  useEffect(() => {
    // Check login status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleEnterFullscreen = () => {
    setIsFullscreen(true);
    setScale(1);
  };

  const handleZoomClick = () => {
    setScale((prev) => (prev === 1 ? 2 : 1));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(0.5, scale + e.deltaY * -0.001), 3);
    setScale(newScale);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setScale(1);
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in again.");
      navigate("/login");
      return;
    }
  
    fetch("http://localhost:5000/api/user/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageId: image.id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update wishlist");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Wishlist update response:", data);
        setAddedToWishlist((prev) => !prev); // Toggle wishlist state
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
        alert("An error occurred. Please try again.");
      });
  };
  

  const handleDownload = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Redirect to BuyerDashboard with the image ID
    navigate(`/buyer-dashboard/${image.id}`, { state: { imageId: image.id, src: image.src } });
  };

  return (
    <>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>
      <div className="parent">
        <div className="showcase-wrapper">
          <div className="showcase-main">
            <div className="card">
              <div className="image-container">
                <img
                  src={image.src}
                  alt={image.title}
                  className="main-image zoomable"
                  onClick={handleEnterFullscreen}
                  style={{ cursor: "zoom-in" }}
                />
              </div>
              <div className="details">
                <div className="artist-info">
                  <img
                    className="artist-avatar"
                    src="/assets/artist.png"
                    alt="Artist"
                  />
                  <div className="text2">
                    <div className="headings">
                      <h2>{image.title}</h2>
                      <h3>by {image.author}</h3>
                    </div>
                    <div className="publish">
                      <p className="publish-date">Published: Mar 6, 2025</p>
                    </div>
                  </div>
                </div>
                <div className="stats">
                  <span>👁️ 122.6K Views</span>
                  <span>❤️ 243 Favorites</span>
                  <span>💬 13 Comments</span>
                </div>
                <div className="actions">
                  <button
                    onClick={handleAddToWishlist}
                    style={{
                      backgroundColor: addedToWishlist ? "#ff4081" : "",
                      color: addedToWishlist ? "white" : "",
                    }}
                  >
                    {addedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                  </button>
                  <button onClick={handleDownload}>Download</button>
                </div>
              </div>
            </div>
          </div>

          <div className="related-section">
            <h3>More like this</h3>
            <div className="related-images">
              {imageData
                .filter((img) => img.groupId === image.groupId && img.id !== image.id)
                .map((img) => (
                  <img
                    key={img.id}
                    src={img.src}
                    alt={img.title}
                    className="related-thumb"
                    onClick={() => navigate(`/showcase/${img.id}`)} // navigate to another image
                  />
                ))}
            </div>
          </div>
        </div>

        {isFullscreen && (
          <div className="fullscreen-overlay" onWheel={handleWheel}>
            <span className="close-btn" onClick={handleCloseFullscreen}>
              ×
            </span>
            <img
              src={image.src}
              alt={image.title}
              className="fullscreen-image"
              style={{
                transform: `scale(${scale})`,
                cursor: scale === 1 ? "zoom-in" : "zoom-out",
              }}
              onClick={handleZoomClick}
              ref={imageRef}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Showcase;
