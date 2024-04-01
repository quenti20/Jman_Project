import React, { useState } from 'react';

const CreateTrainingForm = ({ onSubmit, moduleId }) => {
  const [trainingData, setTrainingData] = useState({
    trainingName: '',
    trainerName: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setTrainingData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newTrainingData = { ...trainingData, moduleId }; // Include moduleId in the training data
    onSubmit(newTrainingData);
    setTrainingData({ // Reset the form fields after submission
      trainingName: '',
      trainerName: '',
      date: '',
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div>
      <h2>Create New Training</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Training Name:
          <input type="text" name="trainingName" value={trainingData.trainingName} onChange={handleChange} />
        </label>
        <label>
          Trainer Name:
          <input type="text" name="trainerName" value={trainingData.trainerName} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={trainingData.date} onChange={handleChange} />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={trainingData.startTime} onChange={handleChange} />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={trainingData.endTime} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTrainingForm;
