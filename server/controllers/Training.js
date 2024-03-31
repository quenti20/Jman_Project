const TrainingSchema = require('../models/TrainingSchema')
const ModuleSchema = require('../models/ModuleSchema')
const mongoose = require('mongoose');


exports.createTraining = async (req, res) => {
    try {
        // Extract data from the request body
        const {module_id, training_name, trainer_name, date, start_time, end_time } = req.body;

        // Create a new training session
        const newTraining = new TrainingSchema({
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
            module_id,
            training_name,
            trainer_name,
            date,
            start_time,  
            end_time
        });

        // Save the training session to the database
        const savedTraining = await newTraining.save();
        
        await ModuleSchema.updateOne(
            { _id: module_id },
            { $push: { trainingSessions: savedTraining._id } }
        );

        // Send a success response
        res.status(201).json({ message: 'Training module created successfully', training: savedTraining });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error creating training module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTrainings = async (req, res) => {
    try {
        // Retrieve all training sessions from the database
        const trainings = await TrainingSchema.find();

        // If no training sessions are found, return a 404 error
        if (!trainings || trainings.length === 0) {
            return res.status(404).json({ error: 'No training sessions found' });
        }

        // Send the training sessions as a success response
        res.status(200).json({ trainings });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error retrieving training sessions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateTraining = async (req,res) =>{

    try {
        // Extract data from the request body
        const { trainingId, module_id, training_name, trainer_name, date, start_time, end_time } = req.body;

        // Find the training session by ID and update it
        const updatedTraining = await TrainingSchema.findOneAndUpdate(
            { _id: trainingId }, // Query to find the training session by ID
            { 
                $set: { // Update fields with the provided values
                    module_id,
                    training_name,
                    trainer_name,
                    date,
                    start_time,  
                    end_time
                }
            },
            { new: true } // Return the updated document
        );

        // If the training session was not found, return a 404 error
        if (!updatedTraining) {
            return res.status(404).json({ error: 'Training session not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Training module updated successfully', training: updatedTraining });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error updating training module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};


exports.deleteTraining = async (req, res) => {
    try {
        // Extract the training ID from the request parameters
        

        // Find the training session by ID and delete it
        const deletedTraining = await TrainingSchema.findByIdAndDelete(req.params.id);

        // If the training session was not found, return a 404 error
        if (!deletedTraining) {
            return res.status(404).json({ error: 'Training session not found' });
        }

        // Remove the deleted training session from the associated module
        await ModuleSchema.updateOne(
            { _id: deletedTraining.module_id },
            { $pull: { trainingSessions: deletedTraining._id } }
        );

        // Send a success response
        res.status(200).json({ message: 'Training session deleted successfully', training: deletedTraining });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting training session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

