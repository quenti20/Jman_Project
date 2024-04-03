import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkSessionCard from '../../../Components/WorkSessionCard/WorkSessionCard';
import UpdateWork from '../../../Components/UpdateWork/UpdateWork';
import './EmployeeTraining.css';
import AddTraining from '../../../Components/AddTraining/AddTraining';
import AddModule from '../../../Components/AddModule/AddModule'; // Import AddModule component
import UpdateModule from '../../../Components/UpdateModule/UpdateModule'; // Import UpdateModule component

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
  const [showAddModule, setShowAddModule] = useState(false); // State for controlling AddModule visibility
  const [showUpdateModule, setShowUpdateModule] = useState(false); // State for controlling UpdateModule visibility
  const [selectedModule, setSelectedModule] = useState(null); // State to store selected module data for update

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllModules');
        const filteredModules = response.data.modules.filter(module => module.UserType === 'Employee');
       // console.log('Modules:',filteredModules)
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
       // console.log('AllWorks',response.data)
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

  const handleUpdateModuleClick = (module) => {
    setSelectedModule(module);
    setShowUpdateModule(true);
  };

  const calculateTimeInterval = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const interval = Math.abs(end - start) / 36e5;
    return interval;
  };

  const filteredAndSortedWorkSessions = modules.map(module => {
    const filteredWorkSessions = works.filter(work => module.WorkSessions.includes(work._id));
   // console.log(`Filtered work sessions for module ${module._id}:`, filteredWorkSessions);
    const sortedWorkSessions = filteredWorkSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      ...module,
      WorkSessions: sortedWorkSessions
    };
  });

  const getUniqueWorkSessionDates = () => {
    const uniqueDatesByModule = filteredAndSortedWorkSessions.map(module => {
      const uniqueDates = [...new Set(module.WorkSessions.map(work => work.date))];
     // console.log(`Unique dates for module ${module._id}:`, uniqueDates);
      return {
        moduleId: module._id,
        uniqueDates: uniqueDates
      };
    });
    const uniqueDates = [...new Set(uniqueDatesByModule.flatMap(module => module.uniqueDates))];
    return uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  };

  return (
    <div>
      <h2>Module List</h2>
      <button onClick={() => setShowAddModule(true)}>Add Module</button> {/* Button to trigger AddModule */}
      <ul className="module-list">
        {modules.map((module) => (
          <li key={module._id} className="module">
            <div className="module-header">
              <h3>{module.TrainingName}</h3>
              <button onClick={() => toggleDetails(module._id)}>
                {showDetails[module._id] ? 'Hide Details' : 'Show Details'}
              </button>
              <button onClick={() => handleUpdateModuleClick(module)}>Update Module</button> {/* Button to trigger UpdateModule */}
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
                    {filteredAndSortedWorkSessions.find(mod => mod._id === module._id).WorkSessions.some(work => work.date === date) && (
                      <>
                        <h4 className="work-session-date">Work Sessions Date: {formatDate(date)}</h4>
                        <ul>
                          {filteredAndSortedWorkSessions.find(mod => mod._id === module._id).WorkSessions.filter(work => work.date === date).map((work) => (
                            <li key={work._id}>
                              <WorkSessionCard className={`WorkSessionCard ${work.WorkType}`} work={work} />
                              <button onClick={() => handleUpdateWorkClick(work)}>Update Work</button>
                              <button onClick={() => handleDeleteWork(work._id, module._id)}>Delete Work</button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
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
      {showAddModule &&(
      <AddModule visibility={showAddModule} setShowAddModule={setShowAddModule} />)} {/* Render AddModule component */}
      {showUpdateModule && (
        <UpdateModule visibility={showUpdateModule} moduleData={selectedModule} onHide={() => setShowUpdateModule(false)} />
      )}
    </div>
  );
};

export default EmployeeTraining;
