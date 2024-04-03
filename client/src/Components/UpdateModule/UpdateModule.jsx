import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const UpdateModule = ({ visibility, moduleData, onHide }) => {
    const [updatedModule, setUpdatedModule] = useState({ ...moduleData });
  
    const handleUpdate = async () => {
      try {
        const { _id, ...moduleDataWithoutId } = updatedModule;
        console.log(updatedModule);
        await axios.put('http://localhost:5000/updateModule', {
          moduleId: _id, // Pass _id as moduleId
          ...moduleDataWithoutId
        });
        onHide();
        // Optionally, handle success scenario
      } catch (error) {
        console.error('Error updating module:', error);
        // Optionally, handle error scenario
      }
    };
  
    const handleChange = (field, value) => {
      setUpdatedModule(prevState => ({
        ...prevState,
        [field]: value
      }));
    };
  
    return (
      <Dialog header="Update Module" visible={visibility} style={{ width: '30rem' }} onHide={onHide}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="trainingName">Training Name</label>
            <InputText id="trainingName" value={updatedModule.TrainingName} onChange={(e) => handleChange('TrainingName', e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="coeName">COE Name</label>
            <InputText id="coeName" value={updatedModule.Coe_Name} onChange={(e) => handleChange('Coe_Name', e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="userType">User Type</label>
            <Dropdown id="userType" value={updatedModule.UserType} options={[{ label: 'Employee', value: 'Employee' }, { label: 'Intern', value: 'Intern' }]} onChange={(e) => handleChange('UserType', e.value)} placeholder="Select User Type" />
          </div>
          <div className="p-field">
            <label htmlFor="date">Date</label>
            <Calendar id="date" value={updatedModule.Date} onChange={(e) => handleChange('Date', e.value)} dateFormat="dd/mm/yy" />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
          <Button label="Update" icon="pi pi-check" onClick={handleUpdate} autoFocus />
        </div>
      </Dialog>
    );
  };
  
  export default UpdateModule;
