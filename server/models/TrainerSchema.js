const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String
    }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
