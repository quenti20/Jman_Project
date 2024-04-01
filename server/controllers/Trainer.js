const Trainer = require('../models/TrainerSchema');

exports.createTrainer = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, email } = req.body;

        // Create a new trainer
        const newTrainer = new Trainer({
            name,
            email
        });

        // Save the trainer to the database
        const savedTrainer = await newTrainer.save();

        // Send a success response
        res.status(201).json({ message: 'Trainer created successfully', trainer: savedTrainer });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error creating trainer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
