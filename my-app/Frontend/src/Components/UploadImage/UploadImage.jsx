import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadImage.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const UploadImage = () => {
  const [imageType, setImageType] = useState("art");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  // const { id: userId } = useParams(); // Extract user ID from URL

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please log in to upload an image.");
      navigate("/login");
    } else {
      console.log("Token retrieved:", token);
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected. Please choose an image to upload.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert("File size exceeds 2MB. Please upload a smaller file.");
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user?.token || localStorage.getItem("token");
  
    if (!imageFile || !category) {
      alert("Please fill all fields and upload an image.");
      return;
    }
  
    if (!token) {
      console.error("No auth token found");
      alert("You must be logged in to upload an image.");
      navigate("/login");
      return;
    }
  
    setIsUploading(true);
  
    const formData = new FormData();
    formData.append("type", imageType);
    formData.append("category", category);
    formData.append("image", imageFile);
    formData.append("description", description);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert(`Image uploaded successfully! Total uploads: ${response.data.uploadCount}`);
        navigate("/dashboard");
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  

  const categories = imageType === "art"
    ? ["Skyscapes", "Fantasy", "Anime", "Comics"]
    : ["Nature", "Landscapes", "Wildlife", "Flowers"];

  return (
    <div className="parent">
      <div className="upload-image-container">
        <h1>Upload Your Creation</h1>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Type of Image:</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              className="form-select"
            >
              <option value="art">Art</option>
              <option value="photo">Photo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>
          <div className="form-group">
            <label>Description (optional):</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="Write a brief description of the image..."
            ></textarea>
          </div>
          {isUploading && <div className="spinner">Uploading...</div>}
          <button type="submit" className="submit-button" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
