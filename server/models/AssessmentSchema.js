const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    module_id:{type:String,required: true },
    trainer_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 100
    },
    date:{
        type:Date,
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
    
    // You can include other fields as needed
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);

module.exports = Assessment;
