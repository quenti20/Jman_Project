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
import InternVisual from './Pages/Auth/InternVisual/InternVisual'; 
import UploadFile from './Components/UploadFile/UploadFile';
import ViewPerformance from './Pages/Auth/UserPerformance/UserPerformance';
import UserDashBoard from './Pages/Auth/UserDashboard/UserDashboard';
import PowerBi from './Components/PowerBi/PowerBI'
import MLModel from './Components/MlModel/MlModel';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} /> 
          <Route path='/mlmodel' element={<MLModel/>} /> 
          <Route path='/powerbi' element={<PowerBi/>} /> 
          <Route path='/createUser' element={<NewUser />} />
          <Route path='/userDashboard' element={<UserDashBoard />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/internPlan' element= {<> <InternTraining /> </>     } /> 
          <Route path='/adminDashboard' element= {<AdminDashboard />} />
          <Route path='/employeePlan' element= {<> <EmployeeTraining /> </>} />           
          <Route path='/employeeVisual' element= {<> <EmployeeVisual /> </>} /> 
          <Route path='/internVisual' element= {<> <InternVisual /> </>} /> 
          <Route path='/uploadFile' element= {<> <UploadFile/> </>} /> 
          <Route path='/viewPerformance' element= {<> <ViewPerformance/> </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
