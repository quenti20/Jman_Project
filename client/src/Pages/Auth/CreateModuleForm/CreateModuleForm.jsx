import React, { useState } from 'react';

const CreateModuleForm = ({ onSubmit }) => {
  const [moduleData, setModuleData] = useState({
    moduleName: '',
    COEName: '',
    startDate: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setModuleData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(moduleData);
    setModuleData({
      moduleName: '',
      COEName: '',
      startDate: ''
    });
  };

  return (
    <div>
      <h2>Create New Module</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Module Name:
          <input type="text" name="moduleName" value={moduleData.moduleName} onChange={handleChange} />
        </label>
        <label>
          COE Name:
          <input type="text" name="COEName" value={moduleData.COEName} onChange={handleChange} />
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={moduleData.startDate} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateModuleForm;
