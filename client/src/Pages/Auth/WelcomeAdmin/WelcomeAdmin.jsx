import React, { useState, useEffect } from 'react';

const WelcomePage = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://localhost:5000/getuser/${userId}`);
        if (response.ok) {
          const userData = await response.json();
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

  return (
    <div>
      {user ? (
        <p>Welcome Admin {user.name}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WelcomePage;
