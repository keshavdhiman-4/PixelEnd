import React from "react";
import Image from "/Users/dell9/WebDev/PixelEnd/my-app/Frontend/src/Components/Image/Image";
import './ImageGrid.css';
import { imageData } from "../../data/imageData";
import { useNavigate } from "react-router-dom";

const ImageGrid = ({ userLoggedIn }) => {  
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/showcase/${id}`);
  };
  
  const images = imageData.filter(img => img.id >= 1 && img.id <= 12);

  return (
    <div className="grid">
      {images.map((image) => (
        <Image key={image.id} image={image.src} path={image.path} title={image.title} author={image.author} isLoggedIn={userLoggedIn} onClick={() => handleClick(image.id)}/>
      ))}
    </div>
  );
};

export default ImageGrid; 