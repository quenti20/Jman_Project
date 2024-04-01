const AssessmentSchema = require('../models/AssessmentSchema')
const ModuleSchema = require('../models/ModuleSchema')
const mongoose = require('mongoose');


exports.createAssessment = async (req, res) => {
    try {
        // Extract data from the request body
        const {testName,module_id, trainer_name, description, date, start_time, end_time } = req.body;

        // Create a new Assessment 
        const newAssessment = new AssessmentSchema({
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
            testName,
            module_id,
            trainer_name,
            date,
            start_time,  
            end_time
        });

        // Save the Assessment session to the database
        const savedAssessment = await newAssessment.save();
        
        await ModuleSchema.updateOne(
            { _id: module_id },
            { $push: { assessments: savedAssessment._id } }
        );

        // Send a success response
        res.status(201).json({ message: 'Assessment module created successfully', Assessment: savedAssessment });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error creating Assessment module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAssessments = async (req, res) => {
    try {
        // Retrieve all assessments from the database
        const assessments = await AssessmentSchema.find();

        // If no assessments are found, return a 404 error
        if (!assessments || assessments.length === 0) {
            return res.status(404).json({ error: 'No assessments found' });
        }

        // Send the assessments as a success response
        res.status(200).json({ assessments });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error retrieving assessments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.updateAssessment = async (req, res) => {
    try {
        // Extract data from the request body
        const { assessmentId, testName, module_id, trainer_name, description, date, start_time, end_time } = req.body;

        // Find the assessment by ID and update it
        const updatedAssessment = await AssessmentSchema.findOneAndUpdate(
            { _id: assessmentId }, // Query to find the assessment by ID
            { 
                $set: { // Update fields with the provided values
                    testName,
                    module_id,
                    trainer_name,
                    description,
                    date,
                    start_time,
                    end_time  
                }
            },
            { new: true } // Return the updated document
        );

        // If the assessment was not found, return a 404 error
        if (!updatedAssessment) {
            return res.status(404).json({ error: 'Assessment module not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Assessment module updated successfully', assessment: updatedAssessment });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error updating assessment module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteAssessment = async (req, res) => {
    try {
        // Extract the assessment ID from the request parameters
        const  assessmentId = await req.params.id;

        // Find the assessment by ID and delete it
        const deletedAssessment = await AssessmentSchema.findByIdAndDelete(assessmentId);

        // If the assessment was not found, return a 404 error
        if (!deletedAssessment) {
            return res.status(404).json({ error: 'Assessment module not found' });
        }

        // Remove the deleted assessment from the associated module
        await ModuleSchema.updateOne(
            { _id: deletedAssessment.module_id },
            { $pull: { assessments: deletedAssessment._id } }
        );

        // Send a success response
        res.status(200).json({ message: 'Assessment module deleted successfully', assessment: deletedAssessment });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting assessment module:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
