const Performance = require('../models/Performance');

// Controller to post performance data
exports.postPerformance = async (req, res) => {
  try {
    const performanceData = req.body;
    const performance = await Performance.create(performanceData);
    res.status(201).json({ success: true, data: performance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all performance data
exports.getAllPerformance = async (req, res) => {
  try {
    const allPerformance = await Performance.find();
    res.status(200).json({ success: true, data: allPerformance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.deleteAllPerformance = async (req, res) => {
    try {
      await Performance.deleteMany({});
      res.status(200).json({ success: true, message: 'All performance data deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };