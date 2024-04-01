import React, { useState } from 'react';

const UpdateModuleForm = ({ initialData, onSubmit }) => {
  const [moduleName, setModuleName] = useState(initialData.moduleName);
  const [COEName, setCOEName] = useState(initialData.COEName);
  const [startDate, setStartDate] = useState(initialData.startDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ moduleName, COEName, startDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Module Name:
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
      </label>
      <label>
        COE Name:
        <input
          type="text"
          value={COEName}
          onChange={(e) => setCOEName(e.target.value)}
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <button type="submit">Update Module</button>
    </form>
  );
};

export default UpdateModuleForm;
