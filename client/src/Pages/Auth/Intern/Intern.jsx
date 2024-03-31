import React, { useState, useEffect } from 'react';
import './Intern.css';
import axios from 'axios';
import modules from '../../../data/module'
import training from '../../../data/training'
import assessments from '../../../data/Assessment'

import { useNavigate } from 'react-router-dom';

const InternPage = () => {
  const [modules, setModules] = useState([]);
  const [openTrainings, setOpenTrainings] = useState([]);
  const [openAssessments, setOpenAssessments] = useState([]);
  const [trainingStatus, setTrainingStatus] = useState({});
  const [assessmentStatus, setAssessmentStatus] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all modules from backend
    axios.get('http://localhost:5000/getallmodules')
      .then(response => {
        setModules(response.data);
      })
      .catch(error => console.error('Error fetching modules:', error));

    // Fetch all trainings from backend
    axios.get('http://localhost:5000/getalltrainings')
      .then(response => {
        const trainings = response.data;
        const now = new Date().getTime();
        const status = {};
        trainings.forEach(training => {
          const trainingEnd = new Date(training.date + ' ' + training.endTime).getTime();
          status[training.id] = now > trainingEnd ? 'Completed' : 'Not Completed';
        });
        setTrainingStatus(status);
      })
      .catch(error => console.error('Error fetching trainings:', error));

    // Fetch all assessments from backend
    axios.get('http://localhost:5000/getallassessments')
      .then(response => {
        const assessments = response.data;
        const now = new Date().getTime();
        const status = {};
        assessments.forEach(assessment => {
          const assessmentEnd = new Date(assessment.date + ' ' + assessment.end_time).getTime();
          status[assessment._id] = now > assessmentEnd ? 'Completed' : 'Not Completed';
        });
        setAssessmentStatus(status);
      })
      .catch(error => console.error('Error fetching assessments:', error));
  }, []);

  const toggleTraining = (moduleId) => {
    setOpenTrainings((prevState) => {
      if (prevState.includes(moduleId)) {
        return prevState.filter((id) => id !== moduleId);
      } else {
        return [...prevState, moduleId];
      }
    });
  };

  const toggleAssessment = (moduleId) => {
    setOpenAssessments((prevState) => {
      if (prevState.includes(moduleId)) {
        return prevState.filter((id) => id !== moduleId);
      } else {
        return [...prevState, moduleId];
      }
    });
  };

  return (
    <div className="intern-page">
      <h1>Data Visualization</h1>
      <div className="gantt-chart">
        <div className="module-header">
          <div className="module-title">Module Name</div>
          <div className="module-title">COE Name</div>
          <div className="module-title">Module Start Date</div>
          <div className="module-title">Trainings</div>
          <div className="module-title">Assessments</div>
        </div>
        {modules.map((module) => (
          <div key={module.id} className="module-row">
            <div className="module-info">
              <div>{module.moduleName}</div>
              <div>{module.COEName}</div>
              <div>{module.startDate}</div>
              <div>
                <button onClick={() => toggleTraining(module.id)}>
                  {openTrainings.includes(module.id) ? 'Hide Trainings' : 'Show Trainings'}
                </button>
              </div>
              <div>
                <button onClick={() => toggleAssessment(module.id)}>
                  {openAssessments.includes(module.id) ? 'Hide Assessments' : 'Show Assessments'}
                </button>
              </div>
            </div>
            {openTrainings.includes(module.id) && (
              <div className="trainings">
                {/* Render trainings dynamically */}
              </div>
            )}
            {openAssessments.includes(module.id) && (
              <div className="assessments">
                {/* Render assessments dynamically */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternPage;
