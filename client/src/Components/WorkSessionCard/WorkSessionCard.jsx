import React from 'react';
import './WorkSessionCard.css'; // Import CSS file for styling

const WorkSessionCard = ({ work }) => {
  return (
    <div className="work-session-card">
      <div className="work-session-header">
        <h3>Work Type: {work.workType}</h3>
      </div>
      <div className="work-session-body">
        {work.workType === 'Assessment' && <p><strong>Test Name:</strong> {work.testName}</p>}
        {work.workType === 'Training' && <p><strong>Trainer Name:</strong> {work.trainer_name}</p>}
        <p><strong>Description:</strong> {work.description}</p>
        <p><strong>Date:</strong> {work.date}</p>
        <p><strong>Start Time:</strong> {work.start_time}</p>
        <p><strong>End Time:</strong> {work.end_time}</p>
      </div>
    </div>
  );
};

export default WorkSessionCard;
