const Module = require('../models/ModuleSchema.js');
const mongoose = require('mongoose');

exports.createModule = async (req, res) => {
    try {
        // Extract data from the request body
        const { TrainingName, Coe_Name, UserType, Date, WorkSessions } = req.body;

        // Create a new module
        const newModule = new Module({
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
            TrainingName,
            Coe_Name,
            UserType,
            Date,
            WorkSessions
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

exports.getModules = async (req, res) => {
    try {
        // Retrieve all modules from the database
        const modules = await Module.find();

        // If no modules are found, return a 404 error
        if (!modules || modules.length === 0) {
            return res.status(404).json({ error: 'No modules found' });
        }

        // Send the modules as a success response
        res.status(200).json({ modules });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error retrieving modules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateModule = async (req, res) => {
    try {
        // Extract data from the request body
        const { moduleId, TrainingName, Coe_Name, UserType, Date, WorkSessions } = req.body;

        // Update the module
        const updatedModule = await Module.findOneAndUpdate(
            { _id: moduleId },
            {
                $set: {
                    TrainingName,
                    Coe_Name,
                    UserType,
                    Date,
                    WorkSessions
                }
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

exports.deleteModule = async (req, res) => {
    try {
        // Extract the module ID from the request parameters
        const moduleId = req.params.id;

        // Find and delete the module by ID
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
