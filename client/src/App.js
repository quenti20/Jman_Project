import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/AdminNavbar/Navbar';
import Login from './Pages/Auth/Login/Login';
import NewUser from './Pages/Auth/UserCreation/NewUser';
import ChangePassword from './Pages/Auth/ChangePassword/ChangePassword';
import InternTraining from './Pages/Auth/InternTraining/InternTraining'; // Import the InternPage component
import AdminDashboard from './Pages/Auth/AdminDashboard/AdminDashboard';
import EmployeeTraining from './Pages/Auth/EmployeeTraining/EmployeeTraining'
import EmployeeVisual from './Pages/Auth/EmployeeVisual/EmployeeVisual'
import InternVisual from './Pages/Auth/InternVisual/InternVisual'; // Import the
function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} /> 
          <Route path='/admin' element={<NewUser />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/internPlan' element= {<><Navbar /> <InternTraining /> </>     } /> 
          <Route path='/adminDashboard' element= {<><Navbar /> <AdminDashboard /> </>     } />
          <Route path='/employeePlan' element= {<><Navbar /> <EmployeeTraining /> </>} />           
          <Route path='/employeeVisual' element= {<><Navbar /> <EmployeeVisual /> </>} /> 
          <Route path='/internVisual' element= {<><Navbar /> <InternVisual /> </>} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
