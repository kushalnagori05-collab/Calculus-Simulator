const { computeDerivative } = require('../utils/mathEngine');
const Calculation = require('../models/Calculation');
const mongoose = require('mongoose');

/**
 * POST /api/differentiate
 * Accepts { expression, variable, order }
 */
async function differentiate(req, res, next) {
  try {
    const { expression, variable = 'x', order = 1 } = req.body;

    const result = computeDerivative(expression, variable, order);

    // Save to DB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Calculation.create({
          type: 'differentiation',
          expression,
          variable,
          result: result.result,
          steps: result.steps,
          order,
        });
      } catch (dbErr) {
        console.warn('Could not save to DB:', dbErr.message);
      }
    }

    res.json({
      success: true,
      data: {
        result: result.result,
        steps: result.steps,
        graphData: result.graphData,
      },
    });
  } catch (err) {
    if (err.message) {
      return res.status(400).json({
        success: false,
        error: `Could not process expression: ${err.message}`,
      });
    }
    next(err);
  }
}

module.exports = { differentiate };
