import React, { useEffect, useState } from 'react';
//import './EmployeePlan.css';

import modulesData from '../../../data/module';
import assessmentsData from '../../../data/Assessment';
import trainingsData from '../../../data/training';
import axios from 'axios';

import CreateTrainingForm from '../../../Components/CreateTrainingForm/CreateTrainingForm';
import CreateAssessmentForm from '../../../Components/CreateAssessmentForm/CreateAssessmentForm';
import CreateModuleForm from '../../../Components/AddModule/AddModule';

import UpdateTrainingForm from '../../../Components/UpdateTrainingForm/UpdateTrainingForm';
import UpdateAssessmentForm from '../../../Components/UpdateAssessmentForm/UpdateAssessment';
import UpdateModuleForm from '../../../Components/UpdateModuleForm/UpdateModuleForm';


const EmployeePlan = () => {
  const [modules, setModules] = useState(modulesData);
  const [trainings, setTrainings] = useState(trainingsData);
  const [assessments, setAssessments] = useState(assessmentsData);

  useEffect(()=> {

    const fetchData = async () => {

      const training = await axios.get("/training");
      setTrainings(training);
    }
    fetchData();
    
  },[])

  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  const [selectedTrainingIndex, setSelectedTrainingIndex] = useState(null);
  const [updateAssessmentIndex, setUpdateAssessmentIndex] = useState(null);

  const [showCreateModuleForm, setShowCreateModuleForm] = useState(false);
  const [updateTrainingIndex, setUpdateTrainingIndex] = useState(null);

  const [showUpdateTrainingForm, setShowUpdateTrainingForm] = useState(false);
  const [showUpdateAssessmentForm, setShowUpdateAssessmentForm] =useState(false);

  const [showUpdateModuleForm, setShowUpdateModuleForm] = useState(false);
  const [updateModuleIndex, setUpdateModuleIndex] = useState(null);

  const handleModuleCreation = (newModuleData) => {
    const newModuleId = modules.length + 1;
    const updatedModules = [...modules, { id: newModuleId, ...newModuleData, trainings: [], assessments: [] }];
    setModules(updatedModules);
    setShowCreateModuleForm(false); // Hide the create module form after submission
  };

  const handleModuleUpdateSubmit = (updatedModuleData) => {
    const updatedModules = modules.map((module, index) => {
      if (index === updateModuleIndex) {
        return { ...module, ...updatedModuleData };
      }
      return module;
    });
    setModules(updatedModules);
    setShowUpdateModuleForm(false); // Hide the update module form after submission
  };

  // Function to display the update module form
  const handleShowUpdateModuleForm = (index) => {
    setUpdateModuleIndex(index);
    setShowUpdateModuleForm(true);
  };

  // Function to delete a module
  const handleDeleteModule = (moduleId) => {
    // Filter out the module to be deleted from the modules state
    const updatedModules = modules.filter(module => module.id !== moduleId);
    setModules(updatedModules);

    // Remove associated trainings of the deleted module
    const updatedTrainings = trainings.filter(training => !updatedModules.some(module => module.trainings.includes(training.id)));
    setTrainings(updatedTrainings);

    // Remove associated assessments of the deleted module
    const updatedAssessments = assessments.filter(assessment => !updatedModules.some(module => module.assessments.includes(assessment._id)));
    setAssessments(updatedAssessments);
  };

  const handleTrainingCreation = moduleId => {
    setSelectedModuleId(moduleId);
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          showCreateTrainingForm: true,
          showCreateAssessmentForm: false
        };
      }
      return module;
    }));
  };

  const handleAssessmentCreation = moduleId => {
    setSelectedModuleId(moduleId);
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          showCreateAssessmentForm: true,
          showCreateTrainingForm: false
        };
      }
      return module;
    }));
  };

  const handleTrainingSubmission = newTrainingData => {
    const newTrainingId = trainings.length + 1;
    const updatedTrainings = [...trainings, { id: newTrainingId, ...newTrainingData }];
    setTrainings(updatedTrainings);
    const updatedModules = modules.map(module => {
      if (module.id === selectedModuleId) {
        return {
          ...module,
          trainings: [...module.trainings, newTrainingId],
          showCreateTrainingForm: false
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleAssessmentSubmission = newAssessmentData => {
    const newAssessmentId = assessments.length + 1;
    const updatedAssessments = [...assessments, { _id: newAssessmentId, ...newAssessmentData }];
    setAssessments(updatedAssessments);
    const updatedModules = modules.map(module => {
      if (module.id === selectedModuleId) {
        return {
          ...module,
          assessments: [...module.assessments, newAssessmentId],
          showCreateAssessmentForm: false
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleToggleVisibility = moduleId => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          showDetails: !module.showDetails
        };
      }
      return module;
    }));
  };

  const handleUpdateTraining = (moduleId, trainingId, trainingIndex) => {
    setSelectedModuleId(moduleId);
    setSelectedTrainingId(trainingId);
    setSelectedTrainingIndex(trainingIndex);
    setShowUpdateTrainingForm(true);
    setUpdateTrainingIndex(trainingIndex);
  };

  const handleUpdateTrainingSubmit = updatedTrainingData => {
    const updatedTrainings = trainings.map((training, index) => {
      if (index === updateTrainingIndex) {
        return { ...training, ...updatedTrainingData };
      }
      return training;
    });
    setTrainings(updatedTrainings);
    setShowUpdateTrainingForm(false);
  };

  const handleDeleteTraining = (moduleId, trainingId) => {
    const updatedTrainings = trainings.filter(training => training.id !== trainingId);
    setTrainings(updatedTrainings);
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          trainings: module.trainings.filter(id => id !== trainingId)
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleUpdateAssessment = (moduleId,assessmentId,assessmentIndex)=>{

      setSelectedModuleId(moduleId);
      setSelectedAssessmentId(assessmentId);
      setUpdateAssessmentIndex(assessmentIndex);
      setShowUpdateAssessmentForm(true);

  };

  const handleUpdateAssessmentSubmit = updatedAssessmentData => {
    const updatedAssessments = assessments.map((assessment, index) => {
      if (index === updateAssessmentIndex) {
        return { ...assessment, ...updatedAssessmentData };
      }
      return assessment;
    });
    setAssessments(updatedAssessments);
    setShowUpdateAssessmentForm(false);
  };

  const handleDeleteAssessment = (moduleId, assessmentId) => {
    const updatedAssessments = assessments.filter(assessment => assessment._id !== assessmentId);
    setAssessments(updatedAssessments);
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          assessments: module.assessments.filter(id => id !== assessmentId)
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  return (
    <div className="employee-plan-container">
      <h2>Employee Plan</h2>

      <button onClick={() => setShowCreateModuleForm(true)}>Create Module</button>

      {showCreateModuleForm && <CreateModuleForm onSubmit={handleModuleCreation} />}

      {modules.map((module,index) => (
        <div className="module-section" key={module.id}>
          <div className="module-header">
            <h3>{module.moduleName}</h3>
            <div>
              <button onClick={() => handleToggleVisibility(module.id)}>
                {module.showDetails ? 'Hide Details' : 'Show Details'}
              </button>
              <button onClick={()=> handleShowUpdateModuleForm(index)}>Update Module</button>
              <button onClick={() => handleDeleteModule(module.id)}>Delete Module</button>
            </div>
              {showUpdateModuleForm && (
                <UpdateModuleForm
                  initialData={modules[updateModuleIndex]}
                  onSubmit={handleModuleUpdateSubmit}
                />
              )}
            
          </div>
          {module.showDetails && (
            <div className="module-details">
              <p><strong>COE:</strong> {module.COEName}</p>
              <p><strong>Start Date:</strong> {module.startDate}</p>
              <div className="trainings-section">
                <h4>Trainings</h4>
                <div className="trainings">
                  {module.trainings.map((trainingId, index) => {
                    const training = trainings.find(t => t.id === trainingId);
                    return (
                      <div key={training.id} className="training">
                        <p><strong>Training Name:</strong> {training.trainingName}</p>
                        <p><strong>Trainer's Name:</strong> {training.trainerName}</p>
                        <p><strong>Date:</strong> {training.date}</p>
                        <p><strong>Start Time:</strong> {training.startTime}</p>
                        <p><strong>End Time:</strong> {training.endTime}</p>
                        <div>
                          <button onClick={() => handleUpdateTraining(module.id, training.id, index)}>Update</button>
                          <button onClick={() => handleDeleteTraining(module.id, training.id)}>Delete</button>
                        </div>
                        {showUpdateTrainingForm && selectedModuleId === module.id && selectedTrainingIndex === index && (
                          <UpdateTrainingForm
                            initialData={trainings.find(t => t.id === selectedTrainingId)}
                            onSubmit={handleUpdateTrainingSubmit}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => handleTrainingCreation(module.id)}>Create Training</button>
              </div>
              {module.showCreateTrainingForm && (
                <CreateTrainingForm onSubmit={handleTrainingSubmission} moduleId={module.id} />
              )}
              <div className="assessments-section">
                <h4>Assessments</h4>
                <div className="assessments">
                  {module.assessments.map((assessmentId,index) => {
                    const assessment = assessments.find(a => a._id === assessmentId);
                    return (
                      <div key={assessment._id} className="assessment">
                        <p><strong>Test Name:</strong> {assessment.testName}</p>
                        <p><strong>Trainer's Name:</strong> {assessment.trainer_name}</p>
                        <p><strong>Description:</strong> {assessment.description}</p>
                        <p><strong>Date:</strong> {assessment.date}</p>
                        <p><strong>Start Time:</strong> {assessment.start_time}</p>
                        <p><strong>End Time:</strong> {assessment.end_time}</p>
                        <div>
                          <button onClick={()=> handleUpdateAssessment(module.id,assessment._id,index)}>Update</button>
                          <button onClick={() => handleDeleteAssessment(module.id,assessment._id)}>Delete</button>
                        </div>
                        {
                          showUpdateAssessmentForm && selectedModuleId === module.id && updateAssessmentIndex === index&&(
                            <UpdateAssessmentForm initialData={assessment} onSubmit={handleUpdateAssessmentSubmit}> </UpdateAssessmentForm>
                          )
                        }
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => handleAssessmentCreation(module.id)}>Create Assessment</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeePlan;
