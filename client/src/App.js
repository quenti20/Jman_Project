import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Auth/Login/Login';
import NewUser from './Pages/Auth/UserCreation/NewUser';
import ChangePassword from './Pages/Auth/ChangePassword/ChangePassword';
import Intern from './Pages/Auth/Intern/Intern'; // Import the InternPage component
import Intern1 from './Pages/Auth/Intern/intern1'; // Import the InternPage component
import EmployeePlan from './Pages/Auth/EmployeePlan/EmployeePlan';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<NewUser />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/intern' element= {<><Navbar /> <Intern /> </>     } /> 
          <Route path='/intern1' element= {<><Navbar /> <Intern1 /> </>     } /> 
          <Route path='/employeePlan' element= {<><Navbar /> <EmployeePlan/> </>     } /> 
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
