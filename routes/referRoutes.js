const express = require('express');
const router = express.Router();
const { shareReferral } = require('../controllers/referController');

router.post('/refer/share', shareReferral);

module.exports = router;
