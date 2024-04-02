import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown'; // Import Dropdown component
import axios from 'axios';

const UpdateWork = ({ workId, visible, onHide, onUpdate }) => {
    const [updatedWork, setUpdatedWork] = useState({
        workType: '',
        trainer_name: '',
        date: new Date(),
        start_time: null,
        end_time: null
    });
    
    useEffect(() => {
        // Reset updatedWork state whenever workId prop changes
        setUpdatedWork({
            workType: '',
            trainer_name: '',
            date: new Date(),
            start_time: null,
            end_time: null
        });
    }, [workId]);

    const handleSave = async () => {
        try {
            // Perform validation if needed
            await axios.put(`http://localhost:5000/updateWork`, updatedWork);
            console.log(updatedWork);
            onUpdate(updatedWork); // Notify parent component about the updated work
            onHide(); // Close the dialog
        } catch (error) {
            console.error('Error updating work:', error);
            // Optionally, you can handle error scenario here
        }
    };

    return (
        <Dialog header="Update Work" visible={visible} style={{ width: '50rem' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="workType">Work Type</label>
                    <Dropdown
                        id="workType"
                        value={updatedWork.workType}
                        options={[{ label: 'Assessment', value: 'Assessment' }, { label: 'Training', value: 'Training' }]}
                        onChange={(e) => setUpdatedWork({ ...updatedWork, workType: e.value })}
                        placeholder="Select Work Type"
                    />
                </div>
                {updatedWork.workType === 'Training' && (
                    <div className="p-field">
                        <label htmlFor="trainerName">Trainer Name</label>
                        <input id="trainerName" value={updatedWork.trainer_name} onChange={(e) => setUpdatedWork({ ...updatedWork, trainer_name: e.target.value })} />
                    </div>
                )}
                {updatedWork.workType === 'Assessment' && (
                    <div className="p-field">
                        <label htmlFor="testName">Test Name</label>
                        <input id="testName" value={updatedWork.testName} onChange={(e) => setUpdatedWork({ ...updatedWork, testName: e.target.value })} />
                    </div>
                )}
                <div className="p-field">
                    <label htmlFor="date">Date</label>
                    <Calendar id="date" value={updatedWork.date} onChange={(e) => setUpdatedWork({ ...updatedWork, date: e.value })} dateFormat="dd/mm/yy" />
                </div>
                <div className="p-field">
                    <label htmlFor="startTime">Start Time</label>
                    <Calendar id="startTime" value={updatedWork.start_time} onChange={(e) => setUpdatedWork({ ...updatedWork, start_time: e.value })} timeOnly showTime />
                </div>
                <div className="p-field">
                    <label htmlFor="endTime">End Time</label>
                    <Calendar id="endTime" value={updatedWork.end_time} onChange={(e) => setUpdatedWork({ ...updatedWork, end_time: e.value })} timeOnly showTime />
                </div>
            </div>
            <div className="p-dialog-footer">
                <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button
                    label="Save"
                    icon="pi pi-check"
                    onClick={handleSave}
                    autoFocus
                    disabled={!updatedWork.workType || (!updatedWork.trainer_name && updatedWork.workType === 'Training') || (!updatedWork.testName && updatedWork.workType === 'Assessment') || !updatedWork.date || !updatedWork.start_time || !updatedWork.end_time}
                />
            </div>
        </Dialog>
    );
};

export default UpdateWork;
