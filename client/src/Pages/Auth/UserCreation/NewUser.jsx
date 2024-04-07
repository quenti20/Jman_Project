import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewUser.css'; // Import CSS file for styling

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('Intern'); // Default value set to 'Intern'
  const navigate = useNavigate();
  const userTypelogin = localStorage.getItem('userType');

  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/newUser', { email, name, userType });
      if (res.status === 200) {
        alert('User Created Successfully !');
        navigate('/adminDashboard');
        setEmail('');
        setName('');
        setUserType('Intern'); // Reset userType to default after successful user creation
      } else {
        alert('Internal server error !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newUser-container">
      {userTypelogin === 'Admin' ? (
        <form className="newUser-create-user" onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Enter Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <select value={userType} onChange={handleSelectChange} required>
            <option value="Intern">Intern</option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
          <br />
          <button type="submit">Create User</button>
        </form>
      ) : (
        <p>Unauthorized User</p>
      )}
    </div>
  );
};

export default NewUser;
