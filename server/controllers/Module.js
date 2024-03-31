const Module = require('../models/ModuleSchema');
const mongoose = require('mongoose');


exports.createEmployeeModule = async (req, res) => {
    try {
        // Extract data from the request body
        const {TrainingName, Module_coe_Name, Date,UserType, trainingSessions, assessments } = req.body;

        // Create a new module
        const newModule = new Module({
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
            TrainingName,
            Module_coe_Name,
            UserType,
            Date,
            trainingSessions,
            assessments
        });

        // Save the module to the database
        const savedModule = await newModule.save();

        // Send a success response
        res.status(201).json({ message: 'Module created successfully', module: savedModule });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error creating module:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
};

exports.getEmployeeModules = async (req, res) => {
    try {
        // Retrieve all employee modules from the database
        const employeeModules = await Module.find();

        // If no employee modules are found, return a 404 error
        if (!employeeModules || employeeModules.length === 0) {
            return res.status(404).json({ error: 'No employee modules found' });
        }

        // Send the employee modules as a success response
        res.status(200).json({ employeeModules });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error retrieving employee modules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateEmployeeModule = async (req, res) => {
    try {
        // Extract data from the request body
        const { moduleId, TrainingName, Module_coe_Name, Date, UserType, trainingSessions, assessments } = req.body;

        // Find the module by ID and update it
        const updatedModule = await Module.findByIdAndUpdate(
            moduleId,
            {
                TrainingName,
                Module_coe_Name,
                Date,
                UserType,
                trainingSessions,
                assessments
            },
            { new: true }
        );

        // If the module was not found, return a 404 error
        if (!updatedModule) {
            return res.status(404).json({ error: 'Module not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Module updated successfully', module: updatedModule });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error updating module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteEmployeeModule = async (req, res) => {
    try {
        // Extract the module ID from the request parameters
        const  moduleId  = await req.params.id;

        // Find the module by ID and delete it
        const deletedModule = await Module.findByIdAndDelete(moduleId);

        // If the module was not found, return a 404 error
        if (!deletedModule) {
            return res.status(404).json({ error: 'Module not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Module deleted successfully', module: deletedModule });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
