import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WelcomePage = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getUser/${token}`, {
          headers: {
            Authorization: `${token}` // Ensure you include 'Bearer' before the token
          }
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  let welcomeMessage = '';
  if (userData) {
    switch (userData.userType) {
      case 'Admin':
        welcomeMessage = `Welcome Admin ${userData.name}`;
        break;
      case 'Intern':
        welcomeMessage = `Welcome Intern ${userData.name}`;
        break;
      case 'Employee':
        welcomeMessage = `Welcome Employee ${userData.name}`;
        break;
      default:
        welcomeMessage = `Welcome ${userData.name}`;
        break;
    }
  }

  return (
    <div>
      {userData ? (
        <div>
          <p>{welcomeMessage}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WelcomePage;
