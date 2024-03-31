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
                localStorage.setItem('id', res.data.user._id)
                if(res.data.user.userType == 'Admin'){
                    navigate('/newUser')
                }
                else{
                    if(res.data.user.hasChanged == false){
                        navigate('/changePassword')
                    }
                    else{
                         if(res.data.user.userType == 'Employee'){
                            navigate('/employee')
                         }
                         else{
                            navigate('/intern')
                         }
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
            <div className="card">
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