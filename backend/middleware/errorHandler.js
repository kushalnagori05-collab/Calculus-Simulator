/**
 * Global error-handling middleware.
 * Catches unhandled errors and returns a consistent JSON response.
 */
const errorHandler = (err, _req, res, _next) => {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An internal server error occurred.'
      : err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
