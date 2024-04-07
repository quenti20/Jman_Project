import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkSessionCard from '../../../Components/WorkSessionCard/WorkSessionCard';
import '../EmployeeVisual/EmployeeVisual.css' ;
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

  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        if (token) {
            try {
                // Fetch modules for Intern
                const modulesResponse = await axios.get('http://localhost:5000/getAllModules', {
                    headers: {
                        Authorization: token
                    }
                });
                const filteredModules = modulesResponse.data.modules.filter(module => module.UserType === 'Intern');
                setModules(filteredModules.map(module => ({ ...module })));
                setLoadingModules(false);
                setShowDetails(filteredModules.reduce((acc, module) => {
                    acc[module._id] = false;
                    return acc;
                }, {}));

                // Fetch all works data
                const worksResponse = await axios.get('http://localhost:5000/getAllWorks', {
                    headers: {
                        Authorization: token
                    }
                });
                setWorks(worksResponse.data.works.map(work => ({ ...work })));
                setLoadingWorks(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    fetchData();
}, []);


  if (loadingModules || loadingWorks) {
    return <div>Loading...</div>;
  }

  const toggleDetails = (moduleId) => {
    setShowDetails({ ...showDetails, [moduleId]: !showDetails[moduleId] });
  };

  const filteredAndSortedWorkSessions = modules.map(module => {
    const filteredWorkSessions = works.filter(work => module.WorkSessions.includes(work._id));
    const sortedWorkSessions = filteredWorkSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      ...module,
      WorkSessions: sortedWorkSessions
    };
  });

  const getUniqueWorkSessionDates = () => {
    const uniqueDatesByModule = filteredAndSortedWorkSessions.map(module => {
      const uniqueDates = [...new Set(module.WorkSessions.map(work => work.date))];
      return {
        moduleId: module._id,
        uniqueDates: uniqueDates
      };
    });
    const uniqueDates = [...new Set(uniqueDatesByModule.flatMap(module => module.uniqueDates))];
    return uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  };

  return (
    <div className='TotalPage'>
      {userType === 'Intern' ? (
        <>
          <h2>Module List</h2>
          <ul className="TotalPage-list">
            {modules.map((module) => (
              <li key={module._id} className="TotalPage-module">
                <div className="TotalPage-module-header">
                  <h3>{module.TrainingName}</h3>
                  <button onClick={() => toggleDetails(module._id)}>
                    {showDetails[module._id] ? 'Hide Module' : 'Show Module'}
                  </button>
                </div>
                {showDetails[module._id] && (
                  <div className="TotalPage-module-details">
                    <p><strong>COE Name:</strong> {module.Coe_Name}</p>
                    <p><strong>User Type:</strong> {module.UserType}</p>
                    <p><strong>Date:</strong> {formatDate(module.Date)}</p>
                    {getUniqueWorkSessionDates().map((date) => (
                      <div key={date}>
                        {filteredAndSortedWorkSessions.find(mod => mod._id === module._id).WorkSessions.some(work => work.date === date) && (
                          <>
                            <h4 className="TotalPage-work-session-date">Work Sessions Date: {formatDate(date)}</h4>
                            <ul className='TotalPage-SessionCard'>
                              {filteredAndSortedWorkSessions.find(mod => mod._id === module._id).WorkSessions.filter(work => work.date === date).map((work) => (
                                <li key={work._id}>
                                  <WorkSessionCard className={`TotalPage-WorkSessionCard ${work.WorkType}`} work={work} />
                                  {/* Your WorkSessionCard component */}
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
        </>
      ) : (
        <p>Unauthorized to Access this Page</p>
      )}
    </div>
  );
};

export default EmployeeTraining;
