import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScroll(true);
      else setShowScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-section about fade-in">
          <h2 className="footer-logo">
            Placement<span>Prep</span>
          </h2>
          <p>
            Helping students prepare for placements with smart quizzes, resume tools, and coding practice.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-section links slide-up">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quiz">Quizzes</Link></li>
            <li><Link to="/practice">Practice</Link></li>
            <li><Link to="/resume">Resume Builder</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-section contact fade-in">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@placementprep.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Bengaluru, India</li>
          </ul>
        </div>
      </div>

      {/* Scroll To Top Button */}
      {showScroll && (
        <button className="scroll-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}

      <div className="footer-bottom slide-up">
        <p>© {new Date().getFullYear()} PlacementPrep. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
