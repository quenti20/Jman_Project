const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  Ass_id: {
    type: String,
    required: true
  },
  module_id: {
    type: String,
    required: true
  },
  Marks_Obtained: {
    type: String,
    required: true
  },
  Total_Marks: {
    type: String,
    required: true
  }
});

// Create and export Performance model
const Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;
