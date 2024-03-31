import React, { useState, useEffect } from 'react';

const UpdateAssessmentForm = ({ initialData, onSubmit }) => {
  const [assessmentData, setAssessmentData] = useState(initialData);

  useEffect(() => {
    setAssessmentData(initialData);
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setAssessmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(assessmentData);
  };

  return (
    <div className='update-assessment-form-container'>
      <div className="update-assessment-form">
        <h2>Update Assessment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Test Name:
            <input type="text" name="testName" value={assessmentData.testName} onChange={handleChange} />
          </label>
          <label>
            Trainer's Name:
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssessmentForm;
