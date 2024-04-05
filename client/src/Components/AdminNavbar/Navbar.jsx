import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import CSS for styling
import { NavContext } from '../../Pages/Auth/AdminDashboard/AdminDashboard'; // Import NavContext

const AdminNavbar = () => {
  const { setIsHome, setIsEmployeePlan, setIsInternPlan, setIsUpload } = useContext(NavContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuItemClick = (menuItem) => {
    // Handle menu item click based on label or other properties
    // This function can be customized according to the application logic
    console.log('Clicked on menu item:', menuItem);
    switch (menuItem) {
      case 'Home':
        localStorage.setItem('isHome', true);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', false);
        setIsHome(true);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(false);
        break;
      case 'Employee Plan':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', true);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', false);
        setIsHome(false);
        setIsEmployeePlan(true);
        setIsInternPlan(false);
        setIsUpload(false);
        break;
      case 'Intern Plan':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', true);
        localStorage.setItem('isUpload', false);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(true);
        setIsUpload(false);
        break;
      case 'Upload Results':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', true);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(true);
        break;
      default:
        break;
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="Admin_Navbar-container">
      <div className="Admin_Navbar-start">
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="Admin_Navbar-logo"></img>
      </div>
      <div className="Admin_Navbar-items">
        <ul className="Admin_Navbar-menu-items">
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Home')}>
            <span className="pi pi-home"></span>
            <span className="Admin_Navbar-menu-item-label">Create New User</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Employee Plan')}>
            <span className="pi pi-calendar"></span>
            <span className="Admin_Navbar-menu-item-label">Employee Plan</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Intern Plan')}>
            <span className="pi pi-users"></span>
            <span className="Admin_Navbar-menu-item-label">Intern Plan</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Upload Results')}>
            <span className="pi pi-upload"></span>
            <span className="Admin_Navbar-menu-item-label">Upload Results</span>
          </li>
        </ul>
      </div>
      <div className="Admin_Navbar-profile-container" onClick={handleProfileClick}>
        <img alt="profile" src='./pics/prof_pic.jpg' height="40" className="Admin_Navbar-profile-icon"></img>
        {isDropdownOpen && (
          <div className="Admin_Navbar-dropdown-content">
            <button>Update Password</button>
            <button>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
