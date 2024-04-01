import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import AddTrainerButton from '../AddTrainerButton/AddTrainerbutton';
import axios from 'axios';

const SearchableList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []); // Fetch data on component mount

    useEffect(() => {
        fetchData(); // Refetch data when data changes
    }, [data]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/sendtrainer');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleAddTrainer = async (trainerName) => {
        try {
            const response = await axios.post('http://localhost:3000/api/trainer', { name: trainerName });
            console.log('Trainer added:', response.data.trainer);
            fetchData(); // Fetch data again to update the list
        } catch (error) {
            console.error('Error adding trainer:', error.response.data.error);
            // Handle errors, show error messages to the user, etc.
        }
    };

    const handleDelete = async (trainer) => {
        try {
            await axios.delete(`http://localhost:3000/api/deletetrainer/${trainer._id}`);
            console.log('Trainer deleted:', trainer);
            fetchData(); // Fetch data again to update the list
        } catch (error) {
            console.error('Error deleting trainer:', error.response.data.error);
            // Handle errors, show error messages to the user, etc.
        }
    };

    // Filter the data based on the search term
    const filteredData = data.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase()); // Assuming each item has a 'name' property
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddTrainerButton onAddTrainer={handleAddTrainer} />
            </div>
            <ListBox
                options={filteredData}
                optionLabel="name"
                optionValue="name"
                style={{ marginTop: '10px', textAlign: 'left' }}
                itemTemplate={(option) => (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{option.name}</span>
                        <div>
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" onClick={() => handleDelete(option)} />
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default SearchableList;
