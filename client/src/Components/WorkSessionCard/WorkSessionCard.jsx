import React from 'react';
import './WorkSessionCard.css'; // Import CSS file for styling

const WorkSessionCard = ({ work }) => {
  return (
    <div className={`work-session-card ${work.workType}`}>
      <div className="work-session-header">
        <h3 className="work-type">{work.workType}</h3>
      </div>
      <div className="work-session-body">
        {work.workType === 'Assessment' && <p className="test-name"><strong>Test Name:</strong> {work.testName}</p>}
        {work.workType === 'Training' && <p className="trainer-name"><strong>Trainer Name:</strong> {work.trainer_name}</p>}
        <p className="description"><strong>Description:</strong> {work.description}</p>
        <p className="date"><strong>Date:</strong> {work.date}</p>
        <p className="start-time"><strong>Start Time:</strong> {work.start_time}</p>
        <p className="end-time"><strong>End Time:</strong> {work.end_time}</p>
      </div>
    </div>
  );
};

export default WorkSessionCard;
