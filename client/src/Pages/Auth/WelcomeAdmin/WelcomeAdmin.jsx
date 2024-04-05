import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WelcomePage = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getUser/${userId}`);
        if (response.status === 200) {
          const userData = response.data.user;
          console.log(userData);
          setUser(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  let welcomeMessage = '';
  if (user) {
    console.log(user);
    switch (user.userType) {
      
      case 'Admin':
        welcomeMessage = `Welcome Admin ${user.name}`;
        break;
      case 'Intern':
        welcomeMessage = `Welcome Intern ${user.name}`;
        console.log("I am Intern")
        break;
      case 'Employee':
        welcomeMessage = `Welcome Employee ${user.name}`;
        break;
      default:
        welcomeMessage = `Welcome ${user.name}`;
        break;
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <p>{welcomeMessage}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WelcomePage;
