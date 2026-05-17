const Calculation = require('../models/Calculation');
const mongoose = require('mongoose');

/**
 * GET /api/history
 * Returns the 20 most recent calculations.
 */
async function getHistory(_req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: [],
        message: 'Database not connected — history unavailable.',
      });
    }

    const history = await Calculation.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-__v')
      .lean();

    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHistory };
