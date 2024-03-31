import React, { useState } from 'react'
// import './ChangePassword.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ChangePassword = () => {

    const navigate = useNavigate()

    const [pass, setPass] = useState('')
    const [repass, setRepass] = useState('')

    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            if(pass == repass){
                const res = await axios.put(`http://localhost:5000/changePassword/${localStorage.getItem('id')}`, {password: pass})
                if(res.status == 200){
                    alert('Password Updated Successfully !')
                    navigate('/login')
                }
                else{
                    console.log(res)
                    alert('Internal Server Error !')
                }
            }
            else{
                alert("Password mismatch !")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="change-password-container">
            <div className="card">
                <form className='change-pass'>
                    <input
                        type="text"
                        placeholder='Enter New Password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        placeholder='Renter New Password'
                        value={repass}
                        onChange={(e) => setRepass(e.target.value)}
                        required
                    />
                    <br />
                    
                    <br />
                    <button onClick={handleChangePassword}>Update Password</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword