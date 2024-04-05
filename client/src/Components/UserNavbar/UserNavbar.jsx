// UserNavbar.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Pages/Auth/UserDashboard/UserDashboard';
import './UserNavbar.css';

const UserNavbar = () => {
  const { userData, setIsInternVisual, setIsEmployeeVisual, setUserPerf,setIsFirstVisit } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    console.log('Clicked on menu item:', menuItem);
    
    switch (menuItem) {
      case 'Visualize Training':
        if (userData.userType === 'Intern') {
          setIsInternVisual(true);
          setIsEmployeeVisual(false);
          setUserPerf(false);
          setIsFirstVisit(false);

        } else if (userData.userType === 'Employee') {
          setIsInternVisual(false);
          setIsEmployeeVisual(true);
          setUserPerf(false);
          setIsFirstVisit(false);

        }
        break;
      case 'Visualize Performance':
        setIsInternVisual(false);
        setIsEmployeeVisual(false);
        setUserPerf(true);
        setIsFirstVisit(false);
        break;
      case 'Home Page':
        setIsFirstVisit(true);
        setIsInternVisual(false);
        setIsEmployeeVisual(false);
        setUserPerf(false);
        console.log('Clicked on Home Page');
        break;
      default:
        break;
    }
  };

  return (
    <div className="User_Navbar-container">
      <div className="User_Navbar-items">
        <ul className="User_Navbar-menu-items">
          <li className="User_Navbar-menu-item" onClick={() => handleMenuItemClick('Visualize Training')}>
            <span className="pi pi-chart-line"></span>
            <span className="User_Navbar-menu-item-label">Visualize Training</span>
          </li>
          
            <li className="User_Navbar-menu-item" onClick={() => handleMenuItemClick('Visualize Performance')}>
              <span className="pi pi-chart-bar"></span>
              <span className="User_Navbar-menu-item-label">Visualize Performance</span>
            </li>
          
          {/* Add Home Page option */}
          <li className="User_Navbar-menu-item" onClick={() => handleMenuItemClick('Home Page')}>
            <span className="pi pi-home"></span>
            <span className="User_Navbar-menu-item-label">Home Page</span>
          </li>
        </ul>
      </div>
      <div className="User_Navbar-profile-container" onClick={handleProfileClick}>
        <img alt="profile" src={userData ? userData.profilePic : ''} height="40" className="User_Navbar-profile-icon"></img>
        {isDropdownOpen && (
          <div className="User_Navbar-dropdown-content">
            <button>Update Password</button>
            <button>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
