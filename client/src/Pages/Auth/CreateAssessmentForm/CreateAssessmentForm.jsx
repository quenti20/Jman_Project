import React, { useState } from 'react';

const CreateAssessmentForm = ({ onSubmit, moduleId }) => {
  const [assessmentData, setAssessmentData] = useState({
    testName: '',
    trainerName: '',
    description: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setAssessmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newAssessmentData = { ...assessmentData, moduleId }; // Include moduleId in the assessment data
    onSubmit(newAssessmentData);
    setAssessmentData({ // Reset the form fields after submission
      testName: '',
      trainerName: '',
      description: '',
      date: '',
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div>
      <h2>Create New Assessment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Test Name:
          <input type="text" name="testName" value={assessmentData.testName} onChange={handleChange} />
        </label>
        <label>
          Trainer Name:
          <input type="text" name="trainerName" value={assessmentData.trainerName} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={assessmentData.description} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={assessmentData.date} onChange={handleChange} />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={assessmentData.startTime} onChange={handleChange} />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={assessmentData.endTime} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAssessmentForm;
