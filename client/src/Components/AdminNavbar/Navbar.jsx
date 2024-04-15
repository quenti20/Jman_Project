import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import CSS for styling
import { NavContext } from '../../Pages/Auth/AdminDashboard/AdminDashboard'; // Import NavContext
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const { setIsHome, setIsEmployeePlan, setIsInternPlan, setIsUpload, setisUpdatePassword, setIsPowerBI, setIsMLModel } = useContext(NavContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the visibility of the menu

  const navigate = useNavigate();

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
        localStorage.setItem('isPowerBI', false);
        localStorage.setItem('isMLModel', false);
        localStorage.setItem('isUpdatePassword', false);
        setisUpdatePassword(false) ;
        setIsPowerBI(false);
        setIsMLModel(false);
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
        localStorage.setItem('isPowerBI', false);
        localStorage.setItem('isMLModel', false);
        localStorage.setItem('isUpdatePassword', false);
        setisUpdatePassword(false) ;
        setIsPowerBI(false);
        setIsMLModel(false);
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
        localStorage.setItem('isPowerBI', false);
        localStorage.setItem('isMLModel', false);
        localStorage.setItem('isUpdatePassword', false);
        setisUpdatePassword(false) ;
        setIsPowerBI(false);
        setIsMLModel(false);
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
        localStorage.setItem('isPowerBI', false);
        localStorage.setItem('isMLModel', false);
        localStorage.setItem('isUpdatePassword', false);
        setisUpdatePassword(false) ;
        setIsPowerBI(false);
        setIsMLModel(false);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(true);
        break;
      case 'Analysis and Insights':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', false);
        localStorage.setItem('isPowerBI', true);
        localStorage.setItem('isMLModel', false);
        localStorage.setItem('isUpdatePassword', false);
        setisUpdatePassword(false) ;
        setIsPowerBI(true);
        setIsMLModel(false);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(false);
        break;
      case 'Predict the Training Hours':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', false);
        localStorage.setItem('isPowerBI', false);
        localStorage.setItem('isMLModel', true);
        localStorage.setItem('isUpdatePassword', false);
        setisUpdatePassword(false) ;
        setIsPowerBI(false);
        setIsMLModel(true);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(false);
        break;
      default:
        break;
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Clicked on Profile Handler');
  };

  const handleDropDownClick = (dropdownItem) => {
    console.log('Clicked on DropDown Handler');
    switch (dropdownItem) {
      case 'Update Password':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', false);
        localStorage.setItem('isUpdatePassword', true);
        localStorage.setItem('isPowerBI', false);
        localStorage.setItem('isMLModel', false);
        setIsPowerBI(false);
        setIsMLModel(false);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(false);
        setisUpdatePassword(true);
        break;
      case 'Log Out':
        localStorage.clear();
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <div className="Admin_Navbar-container">
      <div className="Admin_Navbar-start">
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="Admin_Navbar-logo"></img>
      </div>
      {/* Hamburger menu button */}
      <div className="Admin_Navbar-menu-toggle" onClick={toggleMenu}>
        <div className="Admin_Navbar-menu-icon"></div>
        <div className="Admin_Navbar-menu-icon"></div>
        <div className="Admin_Navbar-menu-icon"></div>
      </div>

      <div className={`Admin_Navbar-items ${isMenuOpen ? 'open' : ''}`}>
        <ul className="Admin_Navbar-menu-items">
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Home')}>
            <span className="pi pi-home"></span>
            <span className="Admin_Navbar-menu-item-label">Home</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Employee Plan')}>
            <span className="pi pi-calendar"></span>
            <span className="Admin_Navbar-menu-item-label">Employee Plan</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Intern Plan')}>
            <span className="pi pi-users"></span>
            <span className="Admin_Navbar-menu-item-label">Intern Plan</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Analysis and Insights')}>
            <span className="pi pi-chart-bar"></span>
            <span className="Admin_Navbar-menu-item-label">Analysis and Insights</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Predict the Training Hours')}>
            <span className="pi pi-chart-line"></span>
            <span className="Admin_Navbar-menu-item-label">Predict Training Hours</span>
          </li>
          <li className="Admin_Navbar-menu-item" onClick={() => handleMenuItemClick('Upload Results')}>
            <span className="pi pi-upload"></span>
            <span className="Admin_Navbar-menu-item-label">Upload Results</span>
          </li>
        </ul>
        <div className="Admin_Navbar-profile-container" onClick={handleProfileClick}>
          <img alt="profile" src='https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png' height="40" className="Admin_Navbar-profile-icon"></img>
          <div className="Admin_Navbar-dropdown-logo" >▼</div> {/* Dropdown logo */}
          
          {isDropdownOpen && (
            <div className="Admin_Navbar-dropdown-content">
              <button onClick={() => handleDropDownClick('Update Password')}>Update Password</button>
              <button onClick={() => handleDropDownClick('Log Out')}>Log Out</button>
            </div>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
