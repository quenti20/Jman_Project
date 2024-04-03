import React from 'react';
import './WorkSessionCard.css'; // Import CSS file for styling


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formatTime = (timeString) => {
  const time = new Date(timeString);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return time.toLocaleTimeString('en-US', options);
};

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
        <p className="date"><strong>Date:</strong> {formatDate(work.date)}</p>
        <p className="start-time"><strong>Start Time:</strong> {formatTime(work.start_time)}</p>
        <p className="end-time"><strong>End Time:</strong> {formatTime(work.end_time)}</p>
      </div>
    </div>
  );
};

export default WorkSessionCard;
