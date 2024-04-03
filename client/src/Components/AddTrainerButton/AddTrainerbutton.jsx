import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const AddTrainerButton = () => {
    const [visible, setVisible] = useState(false);
    const [trainerName, setTrainerName] = useState('');

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
        // Reset trainer name input field
        setTrainerName('');
    };

    const handleAddTrainer = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/trainer', { name: trainerName });
            console.log('Trainer added:', response.data.trainer);
            // Close the dialog after adding the trainer
            hideDialog();
        } catch (error) {
            console.error('Error adding trainer:', error.response.data.error);
            // Handle errors, show error messages to the user, etc.
        }
    };

    return (
        <div>
            <Button icon="pi pi-plus" onClick={showDialog} className="p-button-rounded p-button-secondary" style={{ borderRadius: '50%' }} />
            <Dialog header="Add Trainer" visible={visible} onHide={hideDialog} style={{ width: '30rem' }}>
                <TabView>
                    <TabPanel header="Add">
                        <div>
                            <span className="p-float-label">
                                <InputText id="trainerName" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
                                <label htmlFor="trainerName">Trainer Name</label>
                            </span>
                            <Button label="Add" icon="pi pi-check" onClick={handleAddTrainer} />
                        </div>
                    </TabPanel>
                </TabView>
            </Dialog>
        </div>
    );
};

export default AddTrainerButton;
