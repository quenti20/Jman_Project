const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    TrainingName: {
        type: String,
        required: true
    },
    Coe_Name: {
        type: String
    },
    UserType: {
        type: String,
        enum: ['Employee', 'Intern'], // Specify the allowed values for UserType
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    // Array of training session IDs (one-to-many relationship)
    WorkSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CombinedModel' }], // Reference to CombinedModel
    // You can include other fields as needed
});

const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;
