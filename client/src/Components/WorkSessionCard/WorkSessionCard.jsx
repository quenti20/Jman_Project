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

const calculateStatus = (dateString, endTimeString) => {
  const currentTime = new Date();
  const workDate = new Date(dateString);
  const endTime = new Date(endTimeString);
  
  // If current date is after work date
  if (currentTime.getTime() > workDate.getTime()) {
    return 'Completed';
  } else if (currentTime.getTime() < workDate.getTime()) {
    // If current date is before work date
    return 'Pending';
  } else {
    // If current date is equal to work date, check time
    const endTimeHours = endTime.getHours();
    const endTimeMinutes = endTime.getMinutes();
    const endTimeSeconds = endTime.getSeconds();

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    // If current time is after end time
    if (currentHours > endTimeHours || 
        (currentHours === endTimeHours && currentMinutes > endTimeMinutes) ||
        (currentHours === endTimeHours && currentMinutes === endTimeMinutes && currentSeconds > endTimeSeconds)) {
      return 'Completed';
    } else {
      return 'Pending';
    }
  }
};




const WorkSessionCard = ({ work }) => {
  // Calculate status based on work date and end time
  const status = calculateStatus(work.date, work.end_time);
  console.log(work.end_time)
  // Dynamic class based on completion status and work type
  const cardClass = `work-session-card ${work.workType} ${status === 'Completed' ? 'completed' : ''}`;

  return (
    <div className={cardClass}>
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
        <p className="status"><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
};

export default WorkSessionCard;
