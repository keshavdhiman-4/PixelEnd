import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Image.css';
import { useAuth } from "../../context/AuthContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import axios from "axios";

const Image = ({ image, title, author, onClick, path, imageID }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth(); // Assuming the user context gives current user data
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [comments, setComments] = useState([]);

  // Fetch initial data (like, cart, comments) when the component is mounted
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchData = async () => {
      try {
        // Fetch like status
        const likeRes = await axios.get(`/api/like/${imageID}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setIsLiked(likeRes.data.liked);

        // Fetch cart status
        const cartRes = await axios.get(`/api/cart/${imageID}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setIsAddedToCart(cartRes.data.added);

        // Fetch comments for this image
        const commentRes = await axios.get(`/api/comment/${imageID}`);
        setComments(commentRes.data);
      } catch (err) {
        console.error("Error loading initial data:", err);
      }
    };

    fetchData();
  }, [isLoggedIn, user, imageID]); // Depend on login state, user, and imageID

  // Toggle like/unlike when the like icon is clicked
  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
  
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in again.");
      navigate("/login");
      return;
    }
  
    try {
      // Toggle the like state optimistically
      const newLikeState = !isLiked;
      setIsLiked(newLikeState);
  
      // Send the request to the backend to update the user's likeCount
      const response = await fetch("http://localhost:5000/api/user/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update like count");
      }
  
      const data = await response.json();
      console.log("Like update response:", data);
    } catch (err) {
      console.error("Error updating like:", err);

      setIsLiked(!isLiked);
  
      alert("An error occurred while updating the like count. Please try again.");
    }
  };
  
  
  
  // Open a prompt to add a comment
  const handleComment = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const comment = prompt("Add your comment:");
    if (!comment) return;

    try {
      const { data } = await axios.post(
        "/api/comment",
        { imageId: imageID, comment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments((prevComments) => [...prevComments, data]);
    } catch (err) {
      console.error("Error saving comment:", err);
    }
  };

  // Toggle cart add/remove when cart icon is clicked
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const newCartState = !isAddedToCart;
      setIsAddedToCart(newCartState);
      await axios.post(
        "/api/cart",
        { imageId: imageID },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.error("Error updating cart:", err);
      setIsAddedToCart(!isAddedToCart); // Revert to previous state in case of error
    }
  };

  return (
    <div className="image" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="overlay">
        <div className="text">
          <h3>{title}</h3>
          <p>By {author}</p> 
        </div>
        <div className="icons">
          <p onClick={handleLike}>
            {isLiked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </p>
          <p onClick={handleComment}>
            <ChatBubbleOutlineIcon />
          </p>
          <p onClick={handleAddToCart}>
            {isAddedToCart ? (
              <ShoppingCartIcon style={{ color: "pink" }} />
            ) : (
              <ShoppingCartOutlinedIcon />
            )}
          </p>
        </div>
      </div>
      {/* Render comments below the image */}
      {comments.length > 0 && (
        <div className="comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <small>{comment.comment}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Image;
