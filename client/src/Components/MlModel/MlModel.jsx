import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MlModel.css'; // Import CSS file for styling

const UserType = localStorage.getItem('userType');
const Token = localStorage.getItem('token');

const MLModel = () => {
  const [formData, setFormData] = useState({
    Training_name: '',
    Trainer_name: '',
    UserType: '',
    Status: 'Not Completed' // Default value for Status
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const trainingOptions = [
    'ML Basics',
    'React JS',
    'DevOps Operations',
    'SQL',
    'UI / UX Concept Figma',
    'Quality Assurance Basics',
    'ADF',
    'Security Testing',
    'Data Warehouse - ETL',
    'Cloud Platforms',
    'Git & Version Control',
    'Python for DS'
  ];

  const trainerNames = ['Kundan Kumar S', 'Venkata Charan Kumar Maddula', 'Dhaneshwaran D', 'Arun Prasanth S', 'Swatikka C', 
                 'Pichhapati Venkata Naveen', 'Ajay S', 'Himanshu Soni', 'Shirpi A', 'Keerthika Kannan', 'Lavanya R', 
                 'Sourav Kumar', 'Prasanth S', 'Naveen Kumar S', 'Anto Arokia Mary N L', 'Satyam Pandey S', 'Felix Raj C', 
                 'Pooja Nareshsinh Thakur', 'Sameer Basha B', 'Nivya V', 'Rekha Anandan', 'Dhanasekar Murugan', 
                 'Siddharth Sridhar', 'Babu G', 'Hariharan N', 'Sivamalini V', 'Sachinvias Gopalakrishnan', 
                 'Achyut Pramod','Arjun Ganesan',
                   'Vikas Vyavhare', 'Sathish Kumar V', 'Ravishankar P',
                   'Vendeeshwaran C', 'Divya R', 'Ruthraraj R', 'Likhitha Gurram',
                   'Disha Matilda B', 'Harish P', 'Purvaja Vashistha',
                   'Christopher Raj', 'Rajasundar Murugan Nadar C',
                   'Ankit Kumar Mishra', 'Lejoy J', 'Sriram Krishnamoorthy',
                   'Anil Prasad L', 'Neshanth G', 'Rishikar B',
                   'Kanike Lakshmi Narayana', 'Gopinath Ramesh', 'Molly Buxton',
                   'Gayathri V', 'Vignesh Anantharaj', 'Akkim Balaji C',
                   'Gayathri G S', 'Naga Sandeep Reddy P', 'Christopher D',
                   'Radhakrishnan R', 'Livin Albert B', 'Vigneshwaran Jeyakumar',
                   'Michael Leovalan'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate if any dropdown is left with default value
    if (Object.values(formData).some(value => value === '')) {
      toast.error('Fill up all required fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/predict', formData);
      console.log(response.data);
      const predictionInMinutesString = response.data.prediction[0]; // Assuming prediction is in minutes as a string
      const predictionInMinutes = parseInt(predictionInMinutesString); // Convert to integer
      console.log(predictionInMinutes);
      const hours = Math.floor(predictionInMinutes / 60);
      let minutes = Math.round(predictionInMinutes % 60); // Round off minutes to nearest whole number
      if (minutes >= 30) {
        hours += 1;
        minutes = 0;
      }
      setPrediction(`${hours} hours ${minutes > 0 ? minutes + ' minutes' : ''}`);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setPrediction(null);
    }
  };

  // Conditional rendering based on UserType and Token
  if (UserType === 'Admin' && Token) {
    return (
      <div className="mlmodel-container">
        <h1 className="mlmodel-heading">ML Model Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="mlmodel-form-group">
            <label className="mlmodel-label">Training Name:</label>
            <select name="Training_name" value={formData.Training_name} onChange={handleChange} className="mlmodel-select" required>
              <option value="">Select Training</option>
              {trainingOptions.map((option, index) => (
                <option key={index} value={option.split(':')[0]}>{option.split(':')[0]}</option>
              ))}
            </select>
          </div>
          <div className="mlmodel-form-group">
            <label className="mlmodel-label">Trainer Name:</label>
            <select name="Trainer_name" value={formData.Trainer_name} onChange={handleChange} className="mlmodel-select" required>
              <option value="">Select Trainer</option>
              {trainerNames.map((trainer, index) => (
                <option key={index} value={trainer}>{trainer}</option>
              ))}
            </select>
          </div>
          <div className="mlmodel-form-group">
            <label className="mlmodel-label">User Type:</label>
            <select name="UserType" value={formData.UserType} onChange={handleChange} className="mlmodel-select" required>
              <option value="">Select User Type</option>
              <option value="Intern">Intern</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div className="mlmodel-form-group">
            <label className="mlmodel-label">Status:</label>
            <select name="Status" value={formData.Status} onChange={handleChange} className="mlmodel-select">
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="mlmodel-button">Predict</button>
        </form>
        {prediction && (
          <div className="mlmodel-prediction-result">
            <h2>Prediction Result</h2>
            <p>{`Time of Completion: ${prediction}`}</p>
          </div>
        )}
        {error && <p className="mlmodel-error-message">Error: {error}</p>}
      </div>
    );
  } else {
    return <p>Unauthorized User to view this page.</p>;
  }
};

export default MLModel;
