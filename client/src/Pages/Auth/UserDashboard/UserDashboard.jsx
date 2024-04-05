// UserDashboard.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../../Components/UserNavbar/UserNavbar';
import InternVisual from '../InternVisual/InternVisual';
import EmployeeVisual from '../EmployeeVisual/EmployeeVisual';
import UserPerformance from '../UserPerformance/UserPerformance';
import WelcomePage from '../WelcomeAdmin/WelcomeAdmin'
export const UserContext = createContext();

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isInternVisual, setIsInternVisual] = useState(false);
  const [isEmployeeVisual, setIsEmployeeVisual] = useState(false);
  const [userPerf, setUserPerf] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      axios.get(`http://localhost:5000/getUser/${userId}`)
        .then(response => {
          setUserData(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  useEffect(() => {
    const internVisualStatus = localStorage.getItem('isInternVisual');
    const employeeVisualStatus = localStorage.getItem('isEmployeeVisual');
    const userPerfStatus = localStorage.getItem('isUserPerformance');
    const visited = localStorage.getItem('visited');

    if (visited) {
      setIsFirstVisit(true);
    } else {
      // If it's the first visit, mark it as visited in local storage
      localStorage.setItem('visited', false);
    }

    setIsInternVisual(internVisualStatus === 'true');
    setIsEmployeeVisual(employeeVisualStatus === 'true');
    setUserPerf(userPerfStatus === 'true');
  }, []);

  return (
    <UserContext.Provider value={{ userData, isInternVisual, setIsInternVisual, isEmployeeVisual, setIsEmployeeVisual, userPerf, setUserPerf, isFirstVisit,setIsFirstVisit }}>
      <div>
        <UserNavbar />
        { console.log(isFirstVisit) }

        {userData ? (
          
          isFirstVisit? <WelcomePage />:
          isInternVisual ? <InternVisual /> :
          isEmployeeVisual ? <EmployeeVisual /> :
          userPerf ? <UserPerformance /> : null
        ) : (
          <h1>Loading User Data...</h1>
        )}
      </div>
    </UserContext.Provider>
  );
};

export default UserDashboard;
