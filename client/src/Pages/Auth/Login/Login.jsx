import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/login', {email, password})
            if(res.status == 200){
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("userType",res.data.userType)
                console.log(res.data) 
                // localStorage.setItem('id', res.data.user._id)
                if(res.data.userType == 'Admin'){
                    navigate('/adminDashboard')
                }
                else{
                    if(res.data.hasChanged === false){
                        navigate('/changePassword')
                    }
                    else if(res.data.userType === 'Employee' || res.data.userType === 'Intern'){
                        navigate('/userDashboard') 
                    }
                }
            }
            else{
                alert("Invalid Credentials !")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="cardLogin">
                <form className='login-form'>
                    <input 
                        type="text" 
                        placeholder='Enter Email ID' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <br /><br />
                    <input 
                        type="password" 
                        placeholder='Enter password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br /><br />
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login