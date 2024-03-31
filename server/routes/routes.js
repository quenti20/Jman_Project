const express = require("express");
const router = express.Router();
const userController = require('../controllers/User');
const trainingController = require('../controllers/Training')
const moduleController = require('../controllers/Module')
const PerformanceController = require('../controllers/Performance')
const AssessmentController = require('../controllers/Assessment')


router.post('/newUser', userController.createNewUser)
router.post('/login', userController.userLogin)
router.put('/changePassword/:id', userController.changePassword) 


router.post('/createTraining', trainingController.createTraining);
router.post('/createAssessment', AssessmentController.createAssessment);
router.post('/createEmployeeModule', moduleController.createEmployeeModule);

router.get('/getAllAssessments', AssessmentController.getAssessments);
router.get('/getAllTrainings', trainingController.getTrainings);
router.get('/getAllModules', moduleController.getEmployeeModules);



router.put('/updateTraining', trainingController.updateTraining);
router.put('/updateAssessment', AssessmentController.updateAssessment);
router.put('/updateEmployeeModule', moduleController.updateEmployeeModule);

router.delete('/deleteTraining/:id', trainingController.deleteTraining);
router.delete('/deleteAssessment/:id', AssessmentController.deleteAssessment);
router.delete('/deleteEmployeeModule/:id', moduleController.deleteEmployeeModule);


module.exports = router;

// admin API:  

// post: training_data, assessment_data, module_data. (Create, Update, Delete)
// get:  training_data, assessment_data, module_data.(Read and Display):
 
// post: http://localhost:5000/createTraining
// post: http://localhost:5000/createAssessment
// post: http://localhost:5000/createEmployeeModule


// put: http://localhost:5000/updateTraining
// put: http://localhost:5000/updateAssessment
// put: http://localhost:5000/updateEmployeeModule

// post: http://localhost:5000/deleteTraining
// post: http://localhost:5000/deleteAssessment
// post: http://localhost:5000/deleteEmployeeModule


// get: http://localhost:5000/AllTrainings
// get: http://localhost:5000/AllAssessments
// get: http://localhost:5000/AllEmployeeModule

// Interns: 

// post: http://localhost:5000/createInternModule
// put: http://localhost:5000/updateInternModule
// post: http://localhost:5000/deleteInternModule
// get: http://localhost:5000/AllInternModule
