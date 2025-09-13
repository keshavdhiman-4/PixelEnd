import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Pencil } from "lucide-react"; // Ensure lucide-react is installed
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { username, userId } = useAuth(); // Assuming userId is available in AuthContext
  console.log("User ID:", userId); // Debug userId value

  const [profilePicture, setProfilePicture] = useState("/assets/default-user.png");
  const [boughtCreationsCount, setBoughtCreationsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [uploadCount, setUploadCount] = useState(0);
  // const [activeSection, setActiveSection] = useState("bought");
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setBoughtCreationsCount(data.boughtCreationsCount || 0);
          setWishlistCount(data.wishlistCount || 0);
          setLikeCount(data.likeCount || 0);
          setUploadCount(data.uploadCount || 0);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });

      fetch("http://localhost:5000/api/user/profile-picture", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePicture(data.profilePicture || "/assets/default-user.png");
        })
        .catch((error) => {
          console.error("Error fetching profile picture:", error);
        });
    } else {
      console.error("Token is missing.");
    }
  }, [token]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result;

        try {
          const response = await fetch("http://localhost:5000/api/user/profile-picture", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ profilePicture: base64Image }),
          });

          if (response.ok) {
            setProfilePicture(base64Image);
          } else {
            console.error("Failed to update profile picture.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="parent">
      <div className="dashboard-container">
        <div className="profile-section">
          <div className="cover-photo"></div>
          <div className="profile-info">
            <div className="profile-picture-container">
              <img src={profilePicture} alt="Profile" className="profile-picture" />
              <input
                type="file"
                id="profilePictureInput"
                onChange={handleProfilePictureChange}
                accept="image/*"
                hidden
              />
              <label htmlFor="profilePictureInput" className="change-picture-btn">
                <Pencil size={16} />
              </label>
            </div>
            <div className="username-container">
              <h2 className="username">{username}</h2>
              <p className="user-stats">
                <span>{boughtCreationsCount} Creations Bought</span> |{" "}
                <span>{likeCount} Activities</span>
              </p>
            </div>
            <div className="upload">
              <Link to="/upload">
                <button>Upload your creation</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="sections">
          <div className="section-card" onClick={() => setActiveSection("boughtCreations")}>
            <h3>Bought Creations</h3>
            <p>{boughtCreationsCount} creations bought.</p>
          </div>
          <div className="section-card" onClick={() => setActiveSection("uploadedCreations")}>
            <h3>Uploaded Creations</h3>
            <p>{uploadCount} creations uploaded.</p>
          </div>
          <div className="section-card" onClick={() => setActiveSection("wishlist")}>
            <h3>Wishlist</h3>
            <p>{wishlistCount} creations added to wishlist.</p>
          </div>
          <div className="section-card" onClick={() => setActiveSection("activity")}>
            <h3>Activity</h3>
            <p>{likeCount} creations are liked by you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
