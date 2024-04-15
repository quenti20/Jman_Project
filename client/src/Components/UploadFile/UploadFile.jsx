import React, { useState } from 'react';
import Papa from 'papaparse';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import './UploadFile.css'; // Import CSS for styling

const CSVParser = () => {
    const [jsonData, setJsonData] = useState([]);
    const [isParsing, setIsParsing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const userType = localStorage.getItem('userType');

    const handleFileUpload = (event) => {
        const file = event.files[0];
        setIsParsing(true);
    
        Papa.parse(file, {
            header: true,
            complete: (result) => {
                const formattedData = result.data
                    .filter(item => item.email.trim() !== '')
                    .map(item => {
                        return {
                            email: item.email,
                            Ass_id: item.Ass_id,
                            module_id: item.module_id,
                            Marks_Obtained: item.Marks_Obtained,
                            Total_Marks: item.Total_Marks
                        };
                    });
                setJsonData(formattedData);
                setIsParsing(false);
    
                console.log(formattedData);
                axios.post('http://localhost:5000/AllPerformance', formattedData)
                    .then(response => {
                        console.log('Data sent to backend:', response.data);
                    })
                    .catch(error => {
                        console.error('Error sending data to backend:', error);
                    });
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
                setIsParsing(false);
            }
        });
    };

    const handleDeleteAllPerformances = () => {
        setIsDeleting(true);
        axios.delete('http://localhost:5000/deleteAllPerformance')
            .then(response => {
                console.log('All performances deleted:', response.data);
                setJsonData([]);
                setIsDeleting(false);
            })
            .catch(error => {
                console.error('Error deleting performances:', error);
                setIsDeleting(false);
            });
    };
    
    return (
        <div className="CSVParser-container">
            {userType === 'Admin' && (
                <div className="CSVParser-content">
                    <h2>CSV Parser</h2>
                    <FileUpload name="demo[]" accept=".csv" customUpload uploadHandler={handleFileUpload} className="FileUpload-file-upload" />
                    {isParsing && <p>Parsing...</p>}
                    <button onClick={handleDeleteAllPerformances} disabled={isDeleting} className="FileUpload-button">Delete All Performances</button>
                    {isDeleting && <p>Deleting...</p>}
                    <ul className="CSVParser-data-list">
                        {jsonData.map((data, index) => (
                            <li key={index}>
                                <span>Email: {data.email}</span><br />
                                <span>ass_id: {data.Ass_id}</span><br />
                                <span>module_id: {data.module_id}</span><br />
                                <span>marks_obtained: {data.Marks_Obtained}</span><br />
                                <span>Total_marks: {data.Total_Marks}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {userType !== 'Admin' && <p>You are not authorized to access this feature.</p>}
        </div>
    );
};

export default CSVParser;
