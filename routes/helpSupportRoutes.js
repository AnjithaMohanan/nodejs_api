const express = require('express');
const { sendMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/helpSupportController');
const router = express.Router();


router.post('/messages/send', sendMessage);


router.get('/messages/:userId/:supportAgentId', getMessages);
router.put('/messages/update/:id', updateMessage);


router.delete('/messages/delete/:id', deleteMessage);

module.exports = router;
