import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../../Components/AdminNavbar/Navbar';
import TrainingPage from '../EmployeeTraining/EmployeeTraining';
import CreateUser from '../../../Pages/Auth/UserCreation/NewUser';
import UploadFile from '../../../Components/UploadFile/UploadFile';
import InternPlan from '../InternTraining/InternTraining';
//import { NavContext } from './NavContext'; // Import NavContext

export const NavContext = createContext();

const AdminDashboard = () => {
  //console.log(localStorage.getItem('id'));
  if (!localStorage.getItem('isHome')) {
    localStorage.setItem('isHome', true);
    localStorage.setItem('isEmployeePlan', false);
    localStorage.setItem('isInternPlan', false);
  }

  const [userData, setUserData] = useState(null); // State to store user data
  const [isHome, setIsHome] = useState(true);
  const [isEmployeePlan, setIsEmployeePlan] = useState(false);
  const [isInternPlan, setIsInternPlan] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    // Fetch user data from local storage or API
    const token = localStorage.getItem('token'); // Assuming you store the user id in local storage
    if (token) {
      axios.get(`http://localhost:5000/getUser/${token}`)
        .then(response => {
          setUserData(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <NavContext.Provider value={{ isHome, setIsHome, isEmployeePlan, setIsEmployeePlan, isInternPlan, setIsInternPlan, isUpload, setIsUpload }}>
      {userData ?
        <div>
          <NavBar />
          {localStorage.getItem('isHome') === 'true' ? 
            <CreateUser />  : localStorage.getItem('isEmployeePlan') === 'true' ? 
            <TrainingPage /> : localStorage.getItem('isInternPlan') === 'true' ? 
            <InternPlan /> : localStorage.getItem('isUpload') === 'true' ? 
            <UploadFile /> : <></>}
        </div>
        : <h1>Loading User Data...</h1>} {/* Display a loading message while fetching user data */}
    </NavContext.Provider>
  );
};

export default AdminDashboard;
