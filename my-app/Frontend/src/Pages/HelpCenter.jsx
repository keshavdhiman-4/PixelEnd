import React, { useState } from "react";
import "./HelpCenter.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const faqs = [
  {
    question: "How can I reset my password?",
    answer: "You can reset your password by going to the login page and clicking on 'Forgot Password'. Follow the instructions sent to your registered email.",
  },
  {
    question: "How do I contact support?",
    answer: "You can contact our support team via the 'Contact Us' page or email us at support@pixelend.com.",
  },
  {
    question: "How do I upload my artwork?",
    answer: "You can upload your artwork by navigating to your profile and selecting 'Upload New'. Follow the provided guidelines for file formats and sizes.",
  },
  {
    question: "How does the payment system work?",
    answer: "When a user purchases your artwork, the payment is processed securely through our payment gateway. You can track your earnings from the 'Earnings' section in your dashboard.",
  },
  {
    question: "Can I edit or delete my uploaded artwork?",
    answer: "Yes, you can manage your uploaded artwork from your profile dashboard. You can edit details or remove an artwork if needed.",
  },
  {
    question: "Is there a commission fee on sales?",
    answer: "Yes, PixelEnd takes a small commission fee on each sale to cover operational costs. You can find detailed commission rates in the 'Pricing & Fees' section of your account settings.",
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <div className="parent">
    <div className="help-center-container">
      <h2 className="help-title">Help Center</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default HelpCenter;
