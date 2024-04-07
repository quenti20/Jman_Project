const express = require("express");
const router = express.Router();
const userController = require('../controllers/User');
const trainingController = require('../controllers/Work')
const moduleController = require('../controllers/Module')
const PerformanceController = require('../controllers/Performance')
const AssessmentController = require('../controllers/Assessment')
const CombinedController = require('../controllers/Work')
const TrainerController = require('../controllers/Trainer')
const verifytoken = require('../middleware/verify')

router.post('/newUser', userController.createNewUser) 
router.post('/login', userController.userLogin)
router.put('/changePassword/:id',verifytoken, userController.changePassword)
router.get('/getUser/:id',verifytoken, userController.getUserData) ; 


router.post('/createWork', CombinedController.createWork);
router.post('/createModule', moduleController.createModule);
router.post('/createTrainer', TrainerController.createTrainer);

router.get('/getAllWorks',verifytoken, CombinedController.getWorks);
router.get('/getAllModules',verifytoken, moduleController.getModules); 



//router.put('/updateTraining', trainingController.updateTraining);
router.put('/updateWork', CombinedController.updateWork);
router.put('/updateModule', moduleController.updateModule);

//router.delete('/deleteTraining/:id', trainingController.deleteTraining);
router.delete('/deleteWork/:id', CombinedController.deleteWork);
router.delete('/deleteModule/:id', moduleController.deleteModule);

router.post('/AllPerformance', PerformanceController.postPerformance);
router.get('/getAllPerformance',verifytoken, PerformanceController.getAllPerformance);
router.delete('/deleteAllPerformance', PerformanceController.deleteAllPerformance);


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
