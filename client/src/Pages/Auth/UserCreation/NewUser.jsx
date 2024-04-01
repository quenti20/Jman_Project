import React, { useState } from 'react';
import axios from "axios";
import './NewUser.css';
import { Link, useNavigate } from 'react-router-dom';
import AddTrainerButton from '../../../Components/AddTrainerButton/AddTrainerbutton'; // Import AddTrainerButton component

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('User');

  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/newUser', { email: email, name: name, userType: userType });
      if (res.status === 200) {
        alert('User Created Successfully !');
        navigate('/admin');
        setEmail('');
        setName('');
        setUserType('User');
      } else {
        alert('Internal server error !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="NewUsercard">
        <form className='create-user'>
          <input
            type="text"
            placeholder='Enter Email ID'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <select value={userType} onChange={handleSelectChange} required>
            <option value='Intern'>Intern</option>
            <option value='Employee'>Employee</option>
            <option value='Admin'>Admin</option>
          </select>
          <br />
          <button onClick={handleCreateUser}>Create User</button>
        </form>
        <div className="navigation-buttons">
          <Link to="/employeePlan">
            <button>Employee Plan</button>
          </Link>
          <Link to="/internPlan">
            <button>Intern Plan</button>
          </Link>
          <Link to="/admindashboard">
            <button>Admin Dashboard</button>
          </Link>
          <AddTrainerButton /> {/* Include the AddTrainerButton component here */}
        </div>
      </div>
    </div>
  );
};

export default NewUser;
