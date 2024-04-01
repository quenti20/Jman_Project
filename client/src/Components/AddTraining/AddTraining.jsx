import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown'; 
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import './AddTraining.css';

const AddTraining = () => {
    const [visible, setVisible] = useState(false);
    const [trainingDate, setTrainingDate] = useState(null);
    const [sessionName, setSessionName] = useState('');
    const [sessionDomain, setSessionDomain] = useState('');
    const [trainerName, setTrainerName] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [description, setDescription] = useState('');
    const [trainingType, setTrainingType] = useState(null);
    const [filteredTrainers, setFilteredTrainers] = useState([]);
    const [filteredDomains, setFilteredDomains] = useState([]);
    const [allTrainers, setAllTrainers] = useState([]);
    const [allDomains, setAllDomains] = useState([]);
    const [duration, setDuration] = useState('');

    useEffect(() => {
        fetchAllTrainers();
        fetchAllDomains();
    }, []);

    useEffect(() => {
        calculateDuration();
    }, [startTime, endTime]);

    const fetchAllTrainers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/sendtrainer');
            setAllTrainers(response.data);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    };

    const fetchAllDomains = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/senddomain');
            setAllDomains(response.data);
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };

    const filterTrainers = (event) => {
        const query = event.query;
        const filtered = allTrainers.filter(trainer => {
            return trainer.name.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredTrainers(filtered);
    };

    const filterDomains = (event) => {
        const query = event.query;
        const filtered = allDomains.filter(domain => {
            return domain.name.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredDomains(filtered);
    };

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
        // Reset all fields when dialog is closed
        setTrainingDate(null);
        setSessionName('');
        setSessionDomain('');
        setTrainerName('');
        setStartTime(null);
        setEndTime(null);
        setDescription('');
        setTrainingType(null);
    };

    const handleSave = () => {
        if (parseFloat(duration) <= 8) {
            // Perform save operation with the entered data
            console.log('Training Date:', trainingDate);
            console.log('Session Name:', sessionName);
            console.log('Session Domain:', sessionDomain);
            console.log('Trainer Name:', trainerName);
            console.log('Start Time:', startTime);
            console.log('End Time:', endTime);
            console.log('Description:', description);
            console.log('Training Type:', trainingType);
            console.log('Duration:', duration); 
            hideDialog();
        } else {
            console.log('Duration is greater than 8 hours. Cannot save.');
        }
    };


    const trainingTypeOptions = [
        { label: 'Assessment', value: 'Assessment' },
        { label: 'Training', value: 'Training' }
    ];

    const calculateDuration = () => {
        if (startTime && endTime) {
            const start = new Date(startTime);
            const end = new Date(endTime);
            const difference = Math.abs(end - start) / 36e5; // Difference in hours
            setDuration(difference.toFixed(2) + ' hours');
        } else {
            setDuration('');
        }
    };

    return (
        <div>
            <Button label="Add Training" icon="pi pi-plus" onClick={showDialog} className="p-button-outlined" />
            <Dialog header="Add Training" visible={visible} style={{ width: '50rem' }} onHide={hideDialog}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="trainingDate">Training Date</label>
                        <Calendar id="trainingDate" value={trainingDate} onChange={(e) => setTrainingDate(e.value)} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="sessionName">Session Name</label>
                        <InputText id="sessionName" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="sessionDomain">Session Domain</label>
                        <AutoComplete
                            id="sessionDomain"
                            value={sessionDomain}
                            suggestions={filteredDomains}
                            completeMethod={filterDomains}
                            field="name"
                            onChange={(e) => setSessionDomain(e.value)}
                            placeholder="Search Session Domain"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="trainerName">Trainer Name</label>
                        <AutoComplete
                            id="trainerName"
                            value={trainerName}
                            suggestions={filteredTrainers}
                            completeMethod={filterTrainers}
                            field="name"
                            onChange={(e) => setTrainerName(e.value)}
                            placeholder="Search Trainer"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="trainingType">Training Type</label>
                        <Dropdown id="trainingType" value={trainingType} options={trainingTypeOptions} onChange={(e) => setTrainingType(e.value)} placeholder="Select Training Type" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="startTime">Start Time</label>
                        <Calendar id="startTime" value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly showTime />
                    </div>
                    <div className="p-field">
                        <label htmlFor="endTime">End Time</label>
                        <Calendar id="endTime" value={endTime} onChange={(e) => setEndTime(e.value)} timeOnly showTime />
                    </div>
                    <div className={`p-field ${duration && parseFloat(duration) > 8 ? 'duration-red' : ''}`}>
                        <label>Duration:</label>
                        <span>{duration}</span>
                    </div>
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleSave}
                        autoFocus
                        disabled={duration && parseFloat(duration) > 8}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default AddTraining;

