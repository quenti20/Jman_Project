import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'; 
import axios from 'axios';
import './AddTraining.css';

const AddTraining = ({ module,visiblity,setShowAddTraining}) => {
    const [visible, setVisible] = useState(visiblity);
    const [workType, setWorkType] = useState(null);
    const [trainerName, setTrainerName] = useState('');
    const [testName, setTestName] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
   //    const [date, setDate] = useState(new Date());

    // const [filteredTestNames, setFilteredTestNames] = useState([]);
    // const [filteredTrainers, setFilteredTrainers] = useState([]);

    useEffect(() => {
        // filterTestNames({ query: '' });
        // filterTrainers({ query: '' });
    }, []);

    // const filterTestNames = (event) => {
    //     const query = event.query;
    //     const filtered = module?.testNames.filter(testName =>
    //         testName.toLowerCase().includes(query.toLowerCase())
    //     ) || [];
    //     setFilteredTestNames(filtered);
    // };

    // const filterTrainers = (event) => {
    //     const query = event.query;
    //     const filtered = module?.trainers.filter(trainer =>
    //         trainer.name.toLowerCase().includes(query.toLowerCase())
    //     ) || [];
    //     setFilteredTrainers(filtered);
    // };
   
    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setShowAddTraining(false)
        setVisible(false);
        // Reset all fields when dialog is closed
        setWorkType(null);
        setTrainerName('');
        setTestName('');
        setDate(null);
        setStartTime(null);
        setEndTime(null);
    };

    const handleSave = async () => {
        try {
            // Convert start time to proper time format with AM/PM
            const startTimeString = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            // Convert end time to proper time format with AM/PM
            const endTimeString = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
            const data = {
                workType,
                module_id: module._id,
                trainer_name: trainerName,
                testName: workType === 'Assessment' ? testName : '',
                date,
                start_time: startTimeString,
                end_time: endTimeString
            };
            await axios.post('http://localhost:5000/createWork', data);
            hideDialog();
            // Optionally, you can handle success scenario here
        } catch (error) {
            console.error('Error saving work:', error);
            // Optionally, you can handle error scenario here
        }
    };
    

    return (
        <div>
            {/* <Button label="Create Work" icon="pi pi-plus" onClick={showDialog} className="p-button-outlined" /> */}
            <Dialog header="Create Work" visible={visible} style={{ width: '50rem' }} onHide={hideDialog}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="workType">Work Type</label>
                        <Dropdown
                            id="workType"
                            value={workType}
                            options={[{ label: 'Assessment', value: 'Assessment' }, { label: 'Training', value: 'Training' }]}
                            onChange={(e) => setWorkType(e.value)}
                            placeholder="Select Work Type"
                        />
                    </div>
                    {workType && (
                        <>
                            {workType === 'Assessment' && (
                                <div className="p-field">
                                    <label htmlFor="testName">Test Name</label>
                                    <InputText id="testName" value={testName} onChange={(e) => setTestName(e.target.value)} />
                                </div>
                            )}
                            <div className="p-field">
                                <label htmlFor="trainerName">Trainer Name</label>
                                <InputText id="trainerName" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="date">Date</label>
                                <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="startTime">Start Time</label>
                                <Calendar id="startTime" value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly showTime />
                            </div>
                            <div className="p-field">
                                <label htmlFor="endTime">End Time</label>
                                <Calendar id="endTime" value={endTime} onChange={(e) => setEndTime(e.value)} timeOnly showTime />
                            </div>
                        </>
                    )}
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleSave}
                        autoFocus
                        disabled={!workType || !trainerName || !date || !startTime || !endTime}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default AddTraining;
