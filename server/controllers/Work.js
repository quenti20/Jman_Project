const CombinedModel = require('../models/CombinedSchema');
const ModuleSchema = require('../models/ModuleSchema');
const mongoose = require('mongoose');

exports.createWork = async (req, res) => {
    try {
        // Extract data from the request body
        const { workType, module_id, trainer_name,testName, date, start_time, end_time } = req.body;

        // Create a new document based on workType
        let newWork;
        if (workType === 'Training') {
            newWork = new CombinedModel({
                workType,
                _id: new mongoose.Types.ObjectId(),
                module_id,
                trainer_name, 
                date,
                start_time,
                end_time
            });
        } else if (workType === 'Assessment') { 
            newWork = new CombinedModel({
                workType,
                _id: new mongoose.Types.ObjectId(),
                module_id,
                testName,
                date,
                start_time,
                end_time
            });
        }

        // Save the document to the database
        const savedWork = await newWork.save();

        // If it's a training, update the associated module with the new training session ID
        
            await ModuleSchema.updateOne(
                { _id: module_id },
                { $push: { WorkSessions: savedWork._id } }
            );
        
        res.status(201).json({ message: `${workType} created successfully`, work: savedWork });
    } catch (error) {
        // If an error occurs, send an error response
        console.error(`Error creating:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getWorks = async (req, res) => {
    try {
        // Retrieve all documents from the database
        const works = await CombinedModel.find();

        // If no documents are found, return a 404 error
        if (!works || works.length === 0) {
            return res.status(404).json({ error: 'No works found' });
        }

        // Send the documents as a success response
        res.status(200).json({ works });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error retrieving works:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateWork = async (req, res) => {
    try {
        // Extract data from the request body
        const { workId, workType, module_id, testName, trainer_name, date, start_time, end_time } = req.body;

        // Update the document based on workType
        let updatedWork;
        if (workType === 'Training') {
            updatedWork = await CombinedModel.findOneAndUpdate(
                { _id: workId },
                {
                    $set: {
                        module_id,
                        trainer_name,
                        date,
                        start_time,
                        end_time
                    }
                },
                { new: true }
            );
        } else if (workType === 'Assessment') {
            updatedWork = await CombinedModel.findOneAndUpdate(
                { _id: workId },
                {
                    $set: {
                        module_id,
                        testName,
                        date,
                        start_time,
                        end_time
                    }
                },
                { new: true }
            );
        }

        // If the document was not found, return a 404 error
        if (!updatedWork) {
            return res.status(404).json({ error: ` not found` });
        }

        // Send a success response
        res.status(200).json({ message: `updated successfully`, work: updatedWork });
    } catch (error) {
        // If an error occurs, send an error response
        console.error(`Error updating:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteWork = async (req, res) => {
    try {
        // Extract the work ID from the request parameters
        const workId = req.params.id;

        // Find and delete the document by ID
        const deletedWork = await CombinedModel.findByIdAndDelete(workId);

        // If the document was not found, return a 404 error
        if (!deletedWork) {
            return res.status(404).json({ error: 'Work not found' });
        }

        // If it's a training, remove the deleted training session from the associated module
                await ModuleSchema.updateOne(
                { _id: deletedWork.module_id },
                { $pull: { WorkSessions: deletedWork._id } }
            );
        // Send a success response
        res.status(200).json({ message: 'Work deleted successfully', work: deletedWork });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting work:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
