import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import CSS for styling
import { NavContext } from '../../Pages/Auth/AdminDashboard/AdminDashboard'; // Import NavContext
import { useNavigate } from 'react-router-dom';



const AdminNavbar = () => {
  const { setIsHome, setIsEmployeePlan, setIsInternPlan, setIsUpload ,setisUpdatePassword } = useContext(NavContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    console.log('Clicked on Profile Handler');

  };

  const handleDropDownClick = (dropdownItem) => {
    console.log('Clicked on DropDown Handler');

    switch(dropdownItem){
      case 'Update Password':
        localStorage.setItem('isHome', false);
        localStorage.setItem('isEmployeePlan', false);
        localStorage.setItem('isInternPlan', false);
        localStorage.setItem('isUpload', false);
        localStorage.setItem('isUpdatePassword', true);
        setIsHome(false);
        setIsEmployeePlan(false);
        setIsInternPlan(false);
        setIsUpload(false); 
        setisUpdatePassword(true)
        break;
      case 'Log Out':
        localStorage.clear();
        navigate('/login') ;
        break;
      default:
        break;
    }

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
            <button onClick={() => handleDropDownClick('Update Password')}>Update Password</button>
            <button onClick={() => handleDropDownClick('Log Out')}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
