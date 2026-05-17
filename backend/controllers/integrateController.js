const { computeIntegral } = require('../utils/mathEngine');
const Calculation = require('../models/Calculation');
const mongoose = require('mongoose');

/**
 * POST /api/integrate
 * Accepts { expression, variable, mode, lower, upper }
 */
async function integrate(req, res, next) {
  try {
    const { expression, variable = 'x', mode = 'indefinite', lower, upper } = req.body;

    const isDefinite = mode === 'definite';
    const result = computeIntegral(
      expression,
      variable,
      isDefinite ? lower : null,
      isDefinite ? upper : null
    );

    // Save to DB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Calculation.create({
          type: 'integration',
          expression,
          variable,
          result: result.result,
          steps: result.steps,
          integrationMode: mode,
          limits: isDefinite ? { lower, upper } : undefined,
          numericalResult: result.numericalResult,
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
        numericalResult: result.numericalResult,
      },
    });
  } catch (err) {
    // Nerdamer throws on invalid expressions
    if (err.message) {
      return res.status(400).json({
        success: false,
        error: `Could not process expression: ${err.message}`,
      });
    }
    next(err);
  }
}

module.exports = { integrate };
