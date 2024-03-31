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
    Coe_Name: {type:String},
    UserType: {required:true,type:String},
    Date: {
        type: Date,
        required: true
    },
    // Array of training session IDs (one-to-many relationship)
    trainingSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingSession' }],
    // Array of assessment IDs (one-to-many relationship)
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    // You can include other fields as needed
});

const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;
