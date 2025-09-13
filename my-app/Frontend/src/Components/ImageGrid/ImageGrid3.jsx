import React from "react";
import Image from "/Users/dell9/WebDev/PixelEnd/my-app/Frontend/src/Components/Image/Image";
import './ImageGrid.css';
import { useNavigate } from "react-router-dom";
import { imageData } from "../../data/imageData";


const ImageGrid3 = ({userLoggedIn}) => {  
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/showcase/${id}`);
  };
  const images = imageData.filter(img => img.id >= 25 && img.id <= 36);
  return (
    <div className="grid">
      {images.map((image) => (
        <Image key={image.id} image={image.src} title={image.title} author={image.author} isLoggedIn={userLoggedIn} onClick={() => handleClick(image.id)}/>
      ))}
    </div>
  );
};

export default ImageGrid3; 