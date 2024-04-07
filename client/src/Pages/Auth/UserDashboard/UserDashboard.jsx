// UserDashboard.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../../Components/UserNavbar/UserNavbar';
import InternVisual from '../InternVisual/InternVisual';
import EmployeeVisual from '../EmployeeVisual/EmployeeVisual';
import UserPerformance from '../UserPerformance/UserPerformance';
import WelcomePage from '../WelcomeAdmin/WelcomeAdmin' ;
import UpdatePassword from '../../../Pages/Auth/ChangePassword/ChangePassword';
export const UserContext = createContext();

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isInternVisual, setIsInternVisual] = useState(false);
  const [isEmployeeVisual, setIsEmployeeVisual] = useState(false);
  const [userPerf, setUserPerf] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isUpdatePassword,setisUpdatePassword] = useState(false) ;

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async(token) =>{
      try{
        const response = await axios.get(`http://localhost:5000/getUser/${token}`,{
            headers: {
              Authorization: `${token}`
            }
        });
        console.log(response.data) ;
        setUserData(response.data) ;
        console.log("then---->",response.data) ;
      } catch(error){
        console.error('Error fetching user data:',error) ;
      }
    }
      fetchUserData(token) ;
  },[]);


  useEffect(() => {
    const internVisualStatus = localStorage.getItem('isInternVisual');
    const employeeVisualStatus = localStorage.getItem('isEmployeeVisual');
    const userPerfStatus = localStorage.getItem('isUserPerformance');
    const visited = localStorage.getItem('visited');
    const updatePassword = localStorage.getItem('updatePassword') ;

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
    <UserContext.Provider value={{ userData, isInternVisual, setIsInternVisual, isEmployeeVisual, setIsEmployeeVisual, userPerf, setUserPerf, isFirstVisit,setIsFirstVisit,isUpdatePassword,setisUpdatePassword }}>
      {userData?
      <div>
        <UserNavbar />
        { console.log(isFirstVisit) }

        {userData ? (
          
          isFirstVisit? <WelcomePage />:
          isInternVisual ? <InternVisual /> :
          isEmployeeVisual ? <EmployeeVisual /> :
          userPerf ? <UserPerformance /> :
          isUpdatePassword ? <UpdatePassword /> : null
        ) : (
          <h1>Loading User Data...</h1>
        )}
      </div>
      : <h1>Unauthorized User Access</h1> }
    </UserContext.Provider>
  );
};

export default UserDashboard;
