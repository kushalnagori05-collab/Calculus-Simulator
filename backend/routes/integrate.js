const express = require('express');
const router = express.Router();
const { integrate } = require('../controllers/integrateController');
const { validateIntegration } = require('../middleware/validateInput');

router.post('/', validateIntegration, integrate);

module.exports = router;
