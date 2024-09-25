import React from 'react';
import { Link } from "react-router-dom";
import './userAccount.css'; // Import the CSS file for the UAccount component

const UAccount = () => {
  return (
    <>
      <nav className="navbar-admin">
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
          <ul id="navbar">
            <li><a href="/User-Heart-his">Heart Disease Prediction History</a></li>
            <li><a href="/userDiabeticHis">Diabetic Prediction History</a></li>
            <li><a href="/home">Log Out</a></li>
          </ul>
        </div>
      </nav>
      <div className="dashboard-content">
        <h2><strong>Welcome to the Health Prediction System!</strong></h2>
        <p>Use our models to predict the risk of heart disease and diabetes based on your health data.</p>
        <div className="card-container">
          <div className="prediction-card">
            <h3>Heart Disease Prediction</h3>
            <p>Enter your health data to predict the likelihood of heart disease.</p>
            <Link to="/heartPrediction" className="button-secondary">Predict Now</Link>
          </div>
          <div className="prediction-card">
            <h3>Diabetes Prediction</h3>
            <p>Enter your health data to predict the likelihood of diabetes.</p>
            <Link to="/Diabetic" className="button-secondary">Predict Now</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UAccount;