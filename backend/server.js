require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const integrateRoutes = require('./routes/integrate');
const differentiateRoutes = require('./routes/differentiate');
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Rate limiting — 100 requests per minute per IP
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: { success: false, error: 'Too many requests. Please try again later.' },
  })
);

// ─── API Routes ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Calculus Simulator API is running.' });
});

app.use('/api/integrate', integrateRoutes);
app.use('/api/differentiate', differentiateRoutes);
app.use('/api/history', historyRoutes);

// ─── Error Handler ──────────────────────────────────────────
app.use(errorHandler);

// ─── Start ──────────────────────────────────────────────────
async function start() {
  await connectDB(); // non-blocking — app works without DB
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
}

start();
