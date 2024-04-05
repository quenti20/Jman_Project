import React, { useContext, useState } from 'react';
import './UserNavbar.css'; // Import CSS for styling
import { NavContext } from '../../Pages/Auth/UserDashboard/UserDashboard'; // Import NavContext

const UserNavbar = () => {
  const { setIsEmployee, setIsIntern } = useContext(NavContext); // Update the variable names here
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuItemClick = (menuItem) => {
    // Handle menu item click based on label or other properties
    // This function can be customized according to the application logic
    console.log('Clicked on menu item:', menuItem);
    switch (menuItem) {
      case 'VisualizeTraining':
        setIsEmployee(true); // Use the correct setter here
        setIsIntern(true); // Use the correct setter here
        break;
      case 'VisualizePerformance':
        // Handle navigation to View Your Performance page
        break;
      default:
        break;
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="UserNavbar-container">
      <div className="UserNavbar-items">
        <ul className="UserNavbar-menu-items">
          <li className="UserNavbar-menu-item" onClick={() => handleMenuItemClick('VisualizeTraining')}>
            <span className="UserNavbar-menu-item-label">Visualize Training</span>
          </li>
          <li className="UserNavbar-menu-item" onClick={() => handleMenuItemClick('VisualizePerformance')}>
            <span className="UserNavbar-menu-item-label">Visualize Performance</span>
          </li>
        </ul>
      </div>
      <div className="UserNavbar-profile-container" onClick={handleProfileClick}>
        <img alt="profile" src='./pics/prof_pic.jpg' height="40" className="UserNavbar-profile-icon"></img>
        {isDropdownOpen && (
          <div className="UserNavbar-dropdown-content">
            <button>Update Password</button>
            <button>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
