import React from 'react';
// import { Link } from 'react-router-dom';
// import ChangePassword from '../components/ChangePassword';
import AddTraining from '../../../Components/AddTraining/AddTraining';
import TrainerList from '../../../Components/TrainerList/TrainerList';

// import DomainList from '../components/DomainList'

const AdminDashboard = () => {
  const token = sessionStorage.getItem('token')
  console.log("yes this is the token:", token) 
  return (
    
      <div>
        
        <AddTraining />
        <TrainerList/>
        {/*
        <ChangePassword token={token} /> */}

      </div> 
  );
};

export default AdminDashboard;
