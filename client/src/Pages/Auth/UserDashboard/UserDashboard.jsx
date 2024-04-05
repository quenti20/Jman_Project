// UserDashboard.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../../Components/UserNavbar/UserNavbar';
import InternTraining from '../InternVisual/InternVisual';
import EmployeeTraining from '../EmployeeVisual/EmployeeVisual';
import ViewPerformance from '../UserPerformance/UserPerformance';

export const NavContext = createContext();

const UserDashboard = () => {
  if (!localStorage.getItem('user_id')) {
    // Handle case if user id is not found in localStorage
  }

  const [userData, setUserData] = useState(null); // State to store user data
  const [isEmployee, setIsEmployee] = useState(false);
  const [isIntern, setIsIntern] = useState(false);
  const [isPerformance, setIsPerformance] = useState(false);

  useEffect(() => {
    // Fetch user data from local storage or API
    const userId = localStorage.getItem('id');
    if (userId) {
      axios.get(`http://localhost:5000/getUser/${userId}`)
        .then(response => {
          setUserData(response.data.user);
          // Check if the user is an employee or an intern and set the corresponding state
          if (response.data.user.userType === 'Employee') {
            setIsEmployee(true);
            setIsIntern(false);
          } else if (response.data.user.userType === 'Intern') {
            setIsEmployee(false);
            setIsIntern(true);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <NavContext.Provider value={{ isEmployee, setIsEmployee, isIntern, setIsIntern, isPerformance, setIsPerformance }}>
      {userData ?
        <div>
          <UserNavbar />
          <div>
            {isEmployee && <EmployeeTraining />}
            {isIntern && <InternTraining />}
            {isPerformance && <ViewPerformance />}
          </div>
        </div>
        : <h1>Loading User Data...</h1>} {/* Display a loading message while fetching user data */}
    </NavContext.Provider>
  );
};

export default UserDashboard;
