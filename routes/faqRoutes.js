const express = require('express');
const router = express.Router();
const { addFAQ, getFAQs, deleteFAQ, updateFAQ } = require('../controllers/faqController');

router.post('/faq/add', addFAQ);
router.get('/faqs', getFAQs);
router.put('/faqs/update/:id', updateFAQ);
router.delete('/faqs/delete/:id', deleteFAQ);

module.exports = router;
