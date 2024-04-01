// EmployeeTraining.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkSessionCard from '../../../Components/WorkSessionCard/WorkSessionCard';
import './InternTraining.css'; // Import the CSS file

const InternTraining = () => {
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [showDetails, setShowDetails] = useState({}); // State to track showing/hiding details

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllModules');
        // Filter modules to include only those with UserType as 'Intern'
        const filteredModules = response.data.modules.filter(module => module.UserType === 'Intern');
        setModules(filteredModules);
        setLoadingModules(false);
        // Initialize showDetails state for each module as false
        setShowDetails(filteredModules.reduce((acc, module) => {
          acc[module._id] = false;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllWorks');
        setWorks(response.data.works);
        setLoadingWorks(false);
      } catch (error) {
        console.error('Error fetching works:', error);
      }
    };

    fetchWorks();
  }, []);

  if (loadingModules || loadingWorks) {
    return <div>Loading...</div>;
  }

  const toggleDetails = (moduleId) => {
    setShowDetails({ ...showDetails, [moduleId]: !showDetails[moduleId] });
  };

  return (
    <div>
      <h2>Module List</h2>
      <ul className="module-list">
        {modules.map((module) => (
          <li key={module._id} className="module">
            <div className="module-header">
              <h3>{module.TrainingName}</h3>
              <button onClick={() => toggleDetails(module._id)}>
                {showDetails[module._id] ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            {showDetails[module._id] && (
              <div className="module-details">
                <p><strong>COE Name:</strong> {module.Coe_Name}</p>
                <p><strong>User Type:</strong> {module.UserType}</p>
                <p><strong>Date:</strong> {module.Date}</p>
                {Object.entries(
                  works.filter((work) => module.WorkSessions.includes(work._id)).reduce((acc, work) => {
                    const date = work.date.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(work);
                    return acc;
                  }, {})
                ).map(([date, worksByDate]) => (
                  <div key={date}>
                    <h4>Work Sessions Date: {date}</h4>
                    <ul>
                      {worksByDate.map((work) => (
                        <li key={work._id}>
                          <WorkSessionCard work={work} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternTraining;
