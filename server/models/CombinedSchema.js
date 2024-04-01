const mongoose = require('mongoose');

const combinedSchema = new mongoose.Schema({
    workType: {
        type: String,
        enum: ['Assessment', 'Training'],
        required: true
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module', // Reference to ModuleSchema
        required: true
    },
    testName: {
        type: String,
        required: function() {
            return this.workType === 'Assessment'; // Require testName only for Assessment
        }
    },
    trainer_name: {
        type: String,
        required: function() {
            return this.workType === 'Training'; // Require trainer_name only for Training
        }
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 100
    },
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
    // You can include other fields as needed
});

const CombinedModel = mongoose.model('CombinedModel', combinedSchema);

module.exports = CombinedModel;
