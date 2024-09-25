import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <a href="#">
        <svg xmlns="#" 
	          width="40"
	          height="40" fill="none" 
	          viewBox="0 0 40 40">
	          <path fill="#F06225" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path>
	          <path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
          </svg>
        </a>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li><a href="/home">Home</a></li>
            <li><a href="/service">Services</a></li>
            <li><a className="active" href="/AboutUs">About Us</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
      <div className="about-us-container">
        <header className="header">
          <h1>Welcome to HealthPredict</h1>
          <p>Advanced Heart Disease and Diabetes Prediction System</p>
        </header>
        <section className="content">
          <div className="intro">
            <h2>Introduction</h2>
            <p>
              At HealthPredict, our mission is to empower individuals with tools to predict their risk of heart disease and diabetes. By leveraging the latest in machine learning and data analytics, we provide accessible and accurate predictions that help users take proactive steps toward better health.
            </p>
          </div>
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              Our mission is to utilize advanced AI technologies to offer personalized health insights. We aim to assist individuals in identifying potential health risks early, enabling them to make informed decisions about their health and lifestyle.
            </p>
          </div>
          <div className="about-us">
            <h2>About Us</h2>
            <p>
              HealthPredict was founded by a team of passionate data scientists, healthcare professionals, and tech enthusiasts dedicated to enhancing preventive healthcare. Our system is designed to deliver reliable predictions and actionable insights for managing heart disease and diabetes risks.
            </p>
          </div>
          <div className="values">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Innovation:</strong> Continuously improving our algorithms to provide the most accurate predictions.</li>
              <li><strong>Accessibility:</strong> Making advanced health predictions available to everyone, regardless of location or background.</li>
              <li><strong>Empowerment:</strong> Providing tools that empower users to take control of their health journey.</li>
            </ul>
          </div>
          <div className="contact">
            <h2>Contact Us</h2>
            <p>
              We welcome your questions, feedback, and collaboration opportunities. Reach out to us at:
            </p>
            <ul>
              <li><strong>Email:</strong> support@healthpredict.com</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;