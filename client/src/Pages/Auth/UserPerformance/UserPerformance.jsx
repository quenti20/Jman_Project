import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPerformance.css'; // Import CSS file for styling

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const formatTime = (timeString) => {
    const time = new Date(timeString);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return time.toLocaleTimeString('en-US', options);
};

const UserPerformanceDetails = () => {
    const [userData, setUserData] = useState(null);
    const [userPerformance, setUserPerformance] = useState([]);
    const [allWorks, setAllWorks] = useState([]);

    useEffect(() => {
        // Fetch user data from local storage or API
        const userId = localStorage.getItem('id'); // Assuming you store the user id in local storage
        if (userId) {
            axios.get(`http://localhost:5000/getUser/${userId}`)
                .then(response => {
                    setUserData(response.data.user);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
        
        // Fetch all performance data
        axios.get('http://localhost:5000/getAllPerformance')
            .then(response => {
                setUserPerformance(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching performance data:', error);
            });

        // Fetch all works data
        axios.get('http://localhost:5000/getAllWorks')
            .then(response => {
                setAllWorks(response.data.works);
            })
            .catch(error => {
                console.error('Error fetching works data:', error);
            });
    }, []);

    const getAssessmentDetails = () => {
        if (!userData || !userPerformance.length || !allWorks.length) {
            return <p>Loading...</p>;
        }

        const userEmail = userData.email;

        // Filter performance data for the user
        const userPerformanceData = userPerformance.filter(perf => perf.email === userEmail);

        // Find matching works for each performance assessment
        const assessments = userPerformanceData.map(perf => {
            const matchingWork = allWorks.find(work => work._id === perf.Ass_id);
            return { ...perf, matchingWork };
        });

        return (
            <div className="PerformanceContainer">
                <h1>User Performance Details</h1>

                {/* Header for Test Reports */}
                <div className="TestReportsHeader">
                    <h2>Test Reports for {userData.name}</h2>
                </div>

                {/* User Information */}
                <div className="UserInfoContainer">
                    <p>Email: {userData.email}</p>
                    <p>User Type: {userData.userType}</p>
                </div>
                <div className="Assessment_Details">
                    <h2>Assessment Details</h2>
                </div>
                {/* Assessment Details */}
                <div className="AssessmentContainer">
                
                    {assessments.map(assessment => (
                        <div key={assessment._id} className="AssessmentItem">
                            
                            <p>Test Name: {assessment.matchingWork.testName}</p>
                            <p>Date: {formatDate(assessment.matchingWork.date)}</p>
                            <p>Start Time: {formatTime(assessment.matchingWork.start_time)}</p>
                            <p>End Time: {formatTime(assessment.matchingWork.end_time)}</p>
                            <p>Marks Obtained: {assessment.Marks_Obtained}/{assessment.Total_Marks}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="UserPerformanceDetailsContainer">
            {getAssessmentDetails()}
        </div>
    );
};

export default UserPerformanceDetails;
