import React, { useState, useEffect } from 'react';

const UpdateTrainingForm = ({ initialData, onSubmit }) => {
  const [trainingData, setTrainingData] = useState(initialData);

  useEffect(() => {
    setTrainingData(initialData);
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTrainingData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(trainingData);
  };

  return (
    <div className='update-training-form-container'>
        <div className="update-training-form">
      <h2>Update Training</h2>
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
        <button type="submit">Update</button>
      </form>
      </div>
    </div>
  );
};

export default UpdateTrainingForm;
