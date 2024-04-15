import React from 'react';
import './PowerBI.css'; // Import CSS file for styling

const UserType = localStorage.getItem('userType');
const Token = localStorage.getItem('token');

const PowerBIDashboard = () => {
  // Check if UserType is 'Admin' and Token exists
  const isAuthorized = UserType === 'Admin' && Token;

  return (
    <div className="dashboard-container">
      {isAuthorized ? (
        <>
          <h1 className="dashboard-heading">PowerBI Dashboard</h1>
          <div className="iframe-container">
            <iframe
              title="PowerBI Dashboard"
              className="dashboard-iframe"
              src="https://app.powerbi.com/reportEmbed?reportId=42721049-17a1-46ee-8111-b7c2ecb5d8df&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          </div>
        </>
      ) : (
        <p className="unauthorized-message">Unauthorized User to view this page.</p>
      )}
    </div>
  );
};

export default PowerBIDashboard;
