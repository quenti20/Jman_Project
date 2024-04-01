// EmployeeTraining.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkSessionCard from '../../../Components/WorkSessionCard/WorkSessionCard';
import './EmployeeTraining.css'; // Import the CSS file

const EmployeeTraining = () => {
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [showDetails, setShowDetails] = useState({}); // State to track showing/hiding details

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllModules');
        setModules(response.data.modules);
        setLoadingModules(false);
        // Initialize showDetails state for each module as false
        setShowDetails(response.data.modules.reduce((acc, module) => {
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
            <div className="module-header" onClick={() => toggleDetails(module._id)}>
              <h3>{module.TrainingName}</h3>
              <button>{showDetails[module._id] ? 'Hide' : 'Show'} Details</button>
            </div>
            {showDetails[module._id] && (
              <div className="module-details">
                <p><strong>COE Name:</strong> {module.Coe_Name}</p>
                <p><strong>User Type:</strong> {module.UserType}</p>
                <p><strong>Date:</strong> {module.Date}</p>
                <h4>Work Sessions:</h4>
                <ul>
                  {works.filter(work => work.module_id === module._id).map((work) => (
                    <li key={work._id}>
                      <WorkSessionCard work={work} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeTraining;
