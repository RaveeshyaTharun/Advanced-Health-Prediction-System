import React from 'react';
import { Link } from "react-router-dom";
import './admin.css'; // Import your CSS for styling
import userIcon from '../../Assets/usericon.jpg'; // Replace with the correct path to your image
import heartIcon from '../../Assets/heartIco.png'; // Replace with the correct path to your image
import diabetesIcon from '../../Assets/diabetesIco.png'; // Replace with the correct path to your image

const Admin = () => {
  return (
    <>
      <nav className="navbar-admin">
        <a href="#" className="logo">
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
            <li><Link to="/getUsers">Manage User Details</Link></li>
            <li><Link to="/Heart-his">Heart Disease Predictions</Link></li>
            <li><Link to="/diabeticHis">Diabetes Predictions</Link></li>
            <li><Link to="/home">Log Out</Link></li>
          </ul>
        </div>
      </nav>

      <div className="admin-content">
        <h2><strong>Welcome to the Admin Panel</strong></h2>
        <p>Manage user details and review prediction histories for heart disease and diabetes.</p>
        <div className="admin-actions">
          <div className="action-card">
            <img src={userIcon} alt="User Management" className="card-image" />
            <h3>User Management</h3>
            <p>View and manage all registered users. Update, delete, or review user information.</p>
            <Link to="/getUsers" className="btn-primary">Manage Users</Link>
          </div>
          <div className="action-card">
            <img src={heartIcon} alt="Heart Disease Predictions" className="card-image" />
            <h3>Heart Disease Predictions</h3>
            <p>Access and review the history of heart disease predictions made by the system.</p>
            <Link to="/Heart-his" className="btn-primary">View Heart Predictions</Link>
          </div>
          <div className="action-card">
            <img src={diabetesIcon} alt="Diabetes Predictions" className="card-image" />
            <h3>Diabetes Predictions</h3>
            <p>Access and review the history of diabetes predictions made by the system.</p>
            <Link to="/diabeticHis" className="btn-primary">View Diabetes Predictions</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;