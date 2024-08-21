const express = require('express');
const router = express.Router();
const { addOrUpdatePrivacyPolicy, getPrivacyPolicy, deletePrivacyPolicy } = require('../controllers/privacyPolicyController');
router.post('/privacy-policy', addOrUpdatePrivacyPolicy);
router.get('/privacy-policy', getPrivacyPolicy);
router.delete('/privacy-policy', deletePrivacyPolicy);

module.exports = router;
