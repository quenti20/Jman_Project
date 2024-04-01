import React, { useState, useEffect } from 'react';
import './Intern.css';
import modules from '../../../data/module'; // Import modules array from module.js
import trainings from '../../../data/training';
import assessments from '../../../data/Assessment'; // Import assessment
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Navigate } from 'react-router-dom';

const InternPage = () => {
  // State to track the open/closed state of training details
  const [openTrainings, setOpenTrainings] = useState([]);
  const [openAssessments, setOpenAssessments] = useState([]);

  const navigate = useNavigate(); // Initialize navigate function

  // Function to toggle the open/closed state of training details
  const toggleTraining = (moduleId) => {
    setOpenTrainings((prevState) => {
      if (prevState.includes(moduleId)) {
        return prevState.filter((id) => id !== moduleId);
      } else {
        return [...prevState, moduleId];
      }
    });
  };

  // Function to toggle the open/closed state of assessment details
  const toggleAssessment = (moduleId) => {
    setOpenAssessments((prevState) => {
      if (prevState.includes(moduleId)) {
        return prevState.filter((id) => id !== moduleId);
      } else {
        return [...prevState, moduleId];
      }
    });
  };

  // State to track the completion status of each training
  const [trainingStatus, setTrainingStatus] = useState({});
  const [assessmentStatus, setAssessmentStatus] = useState({});

  useEffect(() => {
    const now = new Date().getTime(); // Current timestamp in milliseconds
    const trainingStatus = {};
    const assessmentStatus = {};

    modules.forEach((module) => {
      module.trainings.forEach((trainingId) => {
        const training = trainings.find((item) => item.id === trainingId); // Find the training object by ID
        if (training) {
          const trainingEnd = new Date(training.date + ' ' + training.endTime).getTime(); // Timestamp for training end time
          // Check if current time is after the training end time
          trainingStatus[training.id] = now > trainingEnd ? 'Completed' : 'Not Completed';
        }
      });

      module.assessments.forEach((assessmentId) => {
        const assessment = assessments.find((item) => item._id === assessmentId); // Find the assessment object by ID
        if (assessment) {
          const assessmentEnd = new Date(assessment.date +' '+assessment.end_time).getTime(); // Timestamp for assessment end time
          assessmentStatus[assessment._id] = now > assessmentEnd ? 'Completed':'Not Completed'; // Store trainer name as status for demonstration
        }
      });
    });

    setTrainingStatus(trainingStatus);
    setAssessmentStatus(assessmentStatus);
  },[]); // Run effect only once on component mount

  // Function to get the training details by ID
  const getTrainingDetails = (trainingId) => {
    return trainings.find((item) => item.id === trainingId);
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
          <div className="module-title">Assessments</div> {/* Add assessment column */}
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
                {module.trainings.map((trainingId) => {
                  const training = getTrainingDetails(trainingId); // Get training details by ID
                  return (
                    <div key={training.id} className="training">
                      <p><strong>Training Name:</strong> {training.trainingName}</p>
                      <p><strong>Trainer Name:</strong> {training.trainerName}</p>
                      <p><strong>Date:</strong> {training.date}</p>
                      <p><strong>Time:</strong> {training.startTime} - {training.endTime}</p>
                      <p><strong>Status:</strong> {trainingStatus[training.id]}</p> {/* Display completion status */}
                    </div>
                  );
                })}
              </div>
            )}
            {openAssessments.includes(module.id) && (
              <div className="assessments">
                {module.assessments.map((assessmentId) => {
                  const assessment = assessments.find((item) => item._id === assessmentId); // Get assessment details by ID
                  return (
                    <div key={assessment._id} className="assessment">
                      <p><strong>Test Name:</strong> {assessment.testName}</p>
                      <p><strong>Trainer Name:</strong> {assessment.trainer_name}</p>
                      <p><strong>Description:</strong> {assessment.description}</p>
                      <p><strong>Status:</strong> {assessmentStatus[assessment._id]}</p>
                      <p><button onClick={() => navigate('/admin')}>View Performance</button></p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternPage;
