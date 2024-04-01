import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/AdminNavbar/Navbar';
import Login from './Pages/Auth/Login/Login';
import NewUser from './Pages/Auth/UserCreation/NewUser';
import ChangePassword from './Pages/Auth/ChangePassword/ChangePassword';
import Intern from './Pages/Auth/Intern/Intern'; // Import the InternPage component
import Intern1 from './Pages/Auth/Intern/intern1'; // Import the InternPage component
import EmployeePlan from './Pages/Auth/EmployeePlan/EmployeePlan';
import AdminDashboard from './Pages/Auth/AdminDashboard/AdminDashboard';
import EmployeeTraining from './Pages/Auth/EmployeeTraining/EmployeeTraining'
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
          <Route path='/adminDashboard' element= {<><Navbar /> <AdminDashboard /> </>     } />
          <Route path='/employeePlan' element= {<><Navbar /> <EmployeeTraining/> </>} />           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
