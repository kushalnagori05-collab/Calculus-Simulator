const express = require('express');
const router = express.Router();
const { differentiate } = require('../controllers/differentiateController');
const { validateDifferentiation } = require('../middleware/validateInput');

router.post('/', validateDifferentiation, differentiate);

module.exports = router;
