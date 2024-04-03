import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkSessionCard from '../../../Components/WorkSessionCard/WorkSessionCard';
import UpdateWork from '../../../Components/UpdateWork/UpdateWork';
import './EmployeeTraining.css';
import AddTraining from '../../../Components/AddTraining/AddTraining';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const EmployeeTraining = () => {
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [showDetails, setShowDetails] = useState({});
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [showUpdateWork, setShowUpdateWork] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllModules');
        const filteredModules = response.data.modules.filter(module => module.UserType === 'Employee');
        setModules(filteredModules.map(module => ({
          ...module,
        })));
        setLoadingModules(false);
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
    setSelectedModuleId(moduleId);
    setShowAddTraining(true);
  };

  const handleUpdateWorkClick = (work) => {
    setSelectedWork(work);
    setShowUpdateWork(true);
  };

  const handleUpdateWork = (updatedWork) => {
    setWorks(works.map(work => (work._id === updatedWork._id ? updatedWork : work)));
  };

  const handleDeleteWork = async (workId, moduleId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteWork/${workId}`);
      setWorks(works.filter(work => work._id !== workId));
      setModules(modules.map(module => {
        if (module._id === moduleId) {
          module.WorkSessions = module.WorkSessions.filter(session => session !== workId);
        }
        return module;
      }));
    } catch (error) {
      console.error('Error deleting work:', error);
    }
  };

  const calculateTimeInterval = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const interval = Math.abs(end - start) / 36e5;
    return interval;
  };

  const calculateTotalHours = (worksByDate) => {
    let totalHours = 0;
    worksByDate.forEach((work) => {
      const interval = calculateTimeInterval(work.start_time, work.end_time);
      totalHours += interval;
    });
    return totalHours.toFixed(2);
  };

  const calculateHoursLeft = (worksByDate) => {
    const totalHours = calculateTotalHours(worksByDate);
    const hoursLeft = 8 - totalHours;
    return hoursLeft.toFixed(2);
  };

  const getUniqueWorkSessionDates = () => {
    const uniqueDates = [...new Set(works.map(work => work.date))];
    return uniqueDates.sort((a, b) => new Date(a) - new Date(b));
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
              {showDetails[module._id] && (
                <button onClick={() => handleAddTrainingClick(module._id)}>Create Work</button>
              )}
            </div>
            {showDetails[module._id] && (
              <div className="module-details">
                <p><strong>COE Name:</strong> {module.Coe_Name}</p>
                <p><strong>User Type:</strong> {module.UserType}</p>
                <p><strong>Date:</strong> {formatDate(module.Date)}</p>
                {getUniqueWorkSessionDates().map((date) => (
                  <div key={date}>
                    <h4 className="work-session-date">Work Sessions Date: {formatDate(date)}</h4>
                    <ul>
                      {works.filter(work => work.date === date).map((work) => (
                        <li key={work._id}>
                          <WorkSessionCard className={`WorkSessionCard ${work.WorkType}`} work={work} />
                          <button onClick={() => handleUpdateWorkClick(work)}>Update Work</button>
                          <button onClick={() => handleDeleteWork(work._id, module._id)}>Delete Work</button>
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
        <UpdateWork work={selectedWork} visible={showUpdateWork} onHide={() => setShowUpdateWork(false)} onUpdate={handleUpdateWork} />
      )}
    </div>
  );
};

export default EmployeeTraining;
