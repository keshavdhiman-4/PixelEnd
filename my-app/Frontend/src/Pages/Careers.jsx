import React from "react";
import "./Careers.css";

const jobListings = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for a skilled frontend developer with experience in React.js and responsive design.",
  },
  {
    title: "Backend Developer",
    location: "New York, USA",
    type: "Part-time",
    description: "Seeking a backend developer proficient in Node.js and database management with MongoDB.",
  },
  {
    title: "UI/UX Designer",
    location: "San Francisco, USA",
    type: "Contract",
    description: "A creative UI/UX designer needed to enhance user experience and maintain design consistency.",
  },
];

const Careers = () => {
  return (
    <>
    <div className="parent">
    <div className="careers-container">
      <h2 className="section-title">Join Our Team</h2>
      <div className="job-listings">
        {jobListings.map((job, index) => (
          <div key={index} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-location">📍 {job.location}</p>
            <p className="job-type">🕒 {job.type}</p>
            <p className="job-description">{job.description}</p>
            <button className="apply-button">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default Careers;
