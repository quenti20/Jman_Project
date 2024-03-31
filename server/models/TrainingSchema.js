const mongoose = require('mongoose');

const TrainingSessionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    module_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    training_name: {
        type: String,
        required: true
    },
    trainer_name: String,
    date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
    
});

const Training = mongoose.model('Training', TrainingSessionSchema);

module.exports = Training;
