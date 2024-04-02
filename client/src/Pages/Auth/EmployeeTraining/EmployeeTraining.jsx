import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkSessionCard from '../../../Components/WorkSessionCard/WorkSessionCard';
import UpdateWork from '../../../Components/UpdateWork/UpdateWork'; // Import the UpdateWork component
import './EmployeeTraining.css'; // Import the CSS file
import AddTraining from '../../../Components/AddTraining/AddTraining';

// Function to format date as dd-mm-yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const EmployeeTraining = () => {
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [showDetails, setShowDetails] = useState({}); // State to track showing/hiding details
  const [selectedModuleId, setSelectedModuleId] = useState(null); // State to store the selected module ID
  const [showAddTraining, setShowAddTraining] = useState(false); // State to track whether to show AddTraining component
  const [visibility, setVisibility] = useState(true);
  const [showUpdateWork, setShowUpdateWork] = useState(false); // State to track whether to show UpdateWork component
  const [selectedWork, setSelectedWork] = useState(null); // State to store the selected work session for update

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllModules');
        // Filter modules to include only those with UserType as 'Employee'
        const filteredModules = response.data.modules.filter(module => module.UserType === 'Employee');
        setModules(filteredModules.map(module => ({
          ...module,
          Date: formatDate(module.Date) // Format module date
        })));
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
        setWorks(response.data.works.map(work => ({
          ...work,
          date: formatDate(work.date) // Format work session date
        })));
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

  const handleAddTrainingClick = (moduleId) => {
    setSelectedModuleId(moduleId); // Set the selected module ID when the button is clicked
    setShowAddTraining(true);
  };

  const handleUpdateWorkClick = (work) => {
    setSelectedWork(work); // Set the selected work session to be updated
    setShowUpdateWork(true); // Show the UpdateWork component
  };

  const handleUpdateWork = (updatedWork) => {
    // Update the state of the works array with the updated work session
    setWorks(works.map(work => (work._id === updatedWork._id ? updatedWork : work)));
  };

  // Function to calculate the time interval between start_time and end_time
  const calculateTimeInterval = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const interval = Math.abs(end - start) / 36e5; // Convert milliseconds to hours
    return interval;
  };

  // Function to calculate the total hours for each WorkSession
  const calculateTotalHours = (worksByDate) => {
    let totalHours = 0;
    worksByDate.forEach((work) => {
      const interval = calculateTimeInterval(work.start_time, work.end_time);
      totalHours += interval;
    });
    return totalHours.toFixed(2);
  };

  // Calculate total hours per WorkSession and hours left to be assigned from 8 hours
  const calculateHoursLeft = (worksByDate) => {
    const totalHours = calculateTotalHours(worksByDate);
    const hoursLeft = 8 - totalHours;
    return hoursLeft.toFixed(2);
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
              {/* Conditionally render the "Create Work" button below the Module Header */}
              {showDetails[module._id] && (
                <button onClick={() => handleAddTrainingClick(module._id)}>Create Work</button>
              )}
            </div>
            {showDetails[module._id] && (
              <div className="module-details">
                <p><strong>COE Name:</strong> {module.Coe_Name}</p>
                <p><strong>User Type:</strong> {module.UserType}</p>
                <p><strong>Date:</strong> {formatDate(module.Date)}</p>
                {Object.entries(
                  works.filter((work) => module.WorkSessions.includes(work._id)).reduce((acc, work) => {
                    const date = work.date;
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(work);
                    return acc;
                  }, {})
                ).map(([date, worksByDate]) => (
                  <div key={date}>
                    <h4 className="work-session-date">Work Sessions Date: {date}</h4>
                    <p>Total Hours: {calculateTotalHours(worksByDate)}</p>
                    <p>Hours Left: {calculateHoursLeft(worksByDate)}</p>
                    <ul>
                      {worksByDate.map((work) => (
                        <li key={work._id}>
                          <WorkSessionCard className={`WorkSessionCard ${work.WorkType}`} work={work} />
                          <button onClick={() => handleUpdateWorkClick(work)}>Update Work</button>
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
      {showAddTraining && (
        <AddTraining module={modules.find(module => module._id === selectedModuleId)} visiblity={visibility} setShowAddTraining={setShowAddTraining} />
      )}
      {showUpdateWork && (
        <UpdateWork workId={selectedWork._id} visible={showUpdateWork} onHide={() => setShowUpdateWork(false)} onUpdate={handleUpdateWork} />
      )}
    </div>
  );
};

export default EmployeeTraining;
