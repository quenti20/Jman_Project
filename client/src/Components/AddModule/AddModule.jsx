import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; 
import { Calendar } from 'primereact/calendar';
import axios from 'axios';

const AddModule = ({ visibility, setShowAddModule }) => {
    const [visible, setVisible] = useState(visibility);
    const [trainingName, setTrainingName] = useState('');
    const [coeName, setCoeName] = useState('');
    const [date, setDate] = useState(new Date());

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setShowAddModule(false);
        setVisible(false);
        // Reset all fields when dialog is closed
        setTrainingName('');
        setCoeName('');
        setDate(null);
    };

    const handleSave = async () => { 
        try {
            const data = {
                TrainingName: trainingName,
                Coe_Name: coeName,
                UserType: 'Employee', // Fixed value for UserType
                Date: date,
                WorkSessions: [] // Initialize WorkSessions array as it's not needed in AddModule
            };
            await axios.post('http://localhost:5000/createModule', data);
            hideDialog();
            // Optionally, you can handle success scenario here
        } catch (error) {
            console.error('Error saving module:', error);
            // Optionally, you can handle error scenario here
        }
    };

    return (
        <div>
            <Dialog header="Create Module" visible={visible} style={{ width: '30rem' }} onHide={hideDialog}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="trainingName">Training Name</label>
                        <InputText id="trainingName" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="coeName">COE Name</label>
                        <InputText id="coeName" value={coeName} onChange={(e) => setCoeName(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date">Date</label>
                        <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
                    </div>
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleSave}
                        autoFocus
                        disabled={!trainingName || !coeName || !date}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default AddModule;
