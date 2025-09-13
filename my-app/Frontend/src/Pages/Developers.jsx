import React from "react";
import "./Developers.css";
import XIcon from '@mui/icons-material/X';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const developers = [
    {
        name: "Akshit Bansal",
        role: "Backend Developer",
        image: "/assets/person.png",
        github: "https://github.com/",
        linkedin: "https://linkedin.com/in/",
        twitter: "https://twitter.com/",
    },
  {
    name: "Keshav Dhiman",
    role: "Frontend Developer",
    image: "/assets/me.jpg",
    github: "https://github.com/keshavdhiman-4",
    linkedin: "https://www.linkedin.com/in/keshavdhiman123/",
    twitter: "https://twitter.com/",
  },
  {
    name: "Harshvardhan Kaushal",
    role: "UI-UX Designer",
    image: "/assets/person2.png",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    name: "Vishnu Tiwari",
    role: "Full-Stack Developer",
    image: "/assets/person3.png",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
];

const Developers = () => {
  return (
    <>
    <div className="parent">
    <div className="developers-container">
      <h1 className="dev-title">Meet Our Developers</h1>
      <div className="developers-grid">
        {developers.map((dev, index) => (
          <div key={index} className="developer-card">
            <img src={dev.image} alt={dev.name} className="developer-image" />
            <h3 className="developer-name">{dev.name}</h3>
            <p className="developer-role">{dev.role}</p>
            <div className="social-icons">
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="icon" />
              </a>
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="icon" />
              </a>
              <a href={dev.twitter} target="_blank" rel="noopener noreferrer">
                <XIcon className="icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </div>
    </>
  );
};

export default Developers;
