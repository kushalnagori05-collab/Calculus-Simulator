/**
 * Input-validation middleware for math endpoints.
 */
const VALID_VARIABLE = /^[a-zA-Z]$/;

function validateIntegration(req, res, next) {
  const { expression, variable = 'x', mode, lower, upper } = req.body;

  if (!expression || typeof expression !== 'string' || !expression.trim()) {
    return res.status(400).json({ success: false, error: 'Please provide a valid mathematical expression.' });
  }
  if (!VALID_VARIABLE.test(variable)) {
    return res.status(400).json({ success: false, error: 'Variable must be a single letter (e.g. x, y, t).' });
  }
  if (mode === 'definite') {
    if (lower === undefined || lower === '' || upper === undefined || upper === '') {
      return res.status(400).json({ success: false, error: 'Definite integration requires both lower and upper limits.' });
    }
  }

  req.body.expression = expression.trim();
  req.body.variable = variable.trim();
  next();
}

function validateDifferentiation(req, res, next) {
  const { expression, variable = 'x', order = 1 } = req.body;

  if (!expression || typeof expression !== 'string' || !expression.trim()) {
    return res.status(400).json({ success: false, error: 'Please provide a valid mathematical expression.' });
  }
  if (!VALID_VARIABLE.test(variable)) {
    return res.status(400).json({ success: false, error: 'Variable must be a single letter (e.g. x, y, t).' });
  }
  const parsedOrder = parseInt(order, 10);
  if (isNaN(parsedOrder) || parsedOrder < 1 || parsedOrder > 5) {
    return res.status(400).json({ success: false, error: 'Derivative order must be between 1 and 5.' });
  }

  req.body.expression = expression.trim();
  req.body.variable = variable.trim();
  req.body.order = parsedOrder;
  next();
}

module.exports = { validateIntegration, validateDifferentiation };
