const mongoose = require('mongoose');

/**
 * Calculation schema — stores every integration/differentiation
 * request so users can browse their history.
 */
const calculationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['integration', 'differentiation'],
      required: true,
    },
    expression: {
      type: String,
      required: true,
    },
    variable: {
      type: String,
      default: 'x',
    },
    result: {
      type: String,
      required: true,
    },
    steps: {
      type: [String],
      default: [],
    },
    // Integration-specific
    integrationMode: {
      type: String,
      enum: ['definite', 'indefinite', null],
      default: null,
    },
    limits: {
      lower: { type: String, default: null },
      upper: { type: String, default: null },
    },
    numericalResult: {
      type: String,
      default: null,
    },
    // Differentiation-specific
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model('Calculation', calculationSchema);
