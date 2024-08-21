const express = require('express');
const router = express.Router();
const { addOrUpdateTerms, getTerms, deleteTerms } = require('../controllers/termsController');

router.post('/terms', addOrUpdateTerms);
router.get('/terms', getTerms);

router.delete('/terms', deleteTerms);
module.exports = router;
