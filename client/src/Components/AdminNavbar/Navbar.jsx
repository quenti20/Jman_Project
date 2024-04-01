import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/admin" className="nav-link">Create User</Link>
        <Link to="/changePassword" className="nav-link">Change Password</Link>
        {/* Add more navigation links here as needed */}
      </div>
    </nav>
  );
}

export default Navbar;
