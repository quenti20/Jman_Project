import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const UpdateWork = ({ work, visible, onHide, onUpdate }) => {
  const [workType, setWorkType] = useState(work?.workType || '');
  const [trainerName, setTrainerName] = useState(work?.trainer_name || '');
  const [testName, setTestName] = useState(work?.testName || '');
  const [date, setDate] = useState(work?.date || new Date());
  const [startTime, setStartTime] = useState(work?.start_time || null);
  const [endTime, setEndTime] = useState(work?.end_time || null);

  useEffect(() => {
    if (work) {
      setWorkType(work.workType);
      setTrainerName(work.trainer_name || '');
      setTestName(work.testName || '');
      setDate(new Date(work.date));
      setStartTime(new Date(work.start_time));
      setEndTime(new Date(work.end_time));
    }
  }, [work]);

  const handleUpdate = async () => {
    try {
      const data = {
        workId: work._id,
        workType,
        trainer_name: workType === 'Training' ? trainerName : '',
        testName: workType === 'Assessment' ? testName : '',
        date,
        start_time: startTime,
        end_time: endTime
      };
      const response = await axios.put('http://localhost:5000/updateWork', data);
      onUpdate(response.data.work);
      onHide();
    } catch (error) {
      console.error('Error updating work:', error);
      // Handle error
    }
  };

  return (
    <Dialog header="Update Work Session" visible={visible} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="workType">Work Type</label>
          <Dropdown
            id="workType"
            value={workType}
            options={[{ label: 'Assessment', value: 'Assessment' }, { label: 'Training', value: 'Training' }]}
            onChange={(e) => setWorkType(e.value)}
            placeholder="Select Work Type"
          />
        </div>
        {workType === 'Training' && (
          <div className="p-field">
            <label htmlFor="trainerName">Trainer Name</label>
            <InputText id="trainerName" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
          </div>
        )}
        {workType === 'Assessment' && (
          <div className="p-field">
            <label htmlFor="testName">Test Name</label>
            <InputText id="testName" value={testName} onChange={(e) => setTestName(e.target.value)} />
          </div>
        )}
        <div className="p-field">
          <label htmlFor="date">Date</label>
          <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
        </div>
        <div className="p-field">
          <label htmlFor="startTime">Start Time</label>
          <Calendar id="startTime" value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly showTime />
        </div>
        <div className="p-field">
          <label htmlFor="endTime">End Time</label>
          <Calendar id="endTime" value={endTime} onChange={(e) => setEndTime(e.value)} timeOnly showTime />
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
        <Button label="Update" icon="pi pi-check" onClick={handleUpdate} autoFocus />
      </div>
    </Dialog>
  );
};

export default UpdateWork;
